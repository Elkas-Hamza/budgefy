<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useConfirm } from '../composables/useConfirm'
import { useToast } from '../composables/useToast'

const router = useRouter()
const toast = useToast()
const { confirm } = useConfirm()

const adminUser = ref(null)
const users = ref({ data: [] })
const stats = ref({})
const activeUsers = ref([])
const showCreateModal = ref(false)
const showEditModal = ref(false)
const userForm = ref({
  id: null,
  name: '',
  email: '',
  password: '',
  is_admin: false
})
const currentPage = ref(1)
let statsInterval = null

const checkAuth = () => {
  const token = localStorage.getItem('admin_token')
  const user = localStorage.getItem('admin_user')
  
  if (!token || !user) {
    router.push('/admin')
    return
  }
  
  adminUser.value = JSON.parse(user)
}

const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('admin_token')
  const response = await fetch(`/api/admin/${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers
    },
    ...options
  })
  
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    router.push('/admin')
    return
  }
  
  return response
}

const loadStats = async () => {
  try {
    const response = await apiCall('stats')
    const data = await response.json()
    stats.value = data
  } catch (error) {
    console.error('Failed to load stats:', error)
  }
}

const loadActiveUsers = async () => {
  try {
    const response = await apiCall('active-users')
    const data = await response.json()
    activeUsers.value = Object.values(data.active_users || {})
  } catch (error) {
    console.error('Failed to load active users:', error)
  }
}

const loadUsers = async (page = 1) => {
  try {
    const response = await apiCall(`users?page=${page}`)
    const data = await response.json()
    users.value = data.users
    currentPage.value = page
  } catch (error) {
    console.error('Failed to load users:', error)
  }
}

const createUser = async () => {
  try {
    const response = await apiCall('users', {
      method: 'POST',
      body: JSON.stringify(userForm.value)
    })
    
    if (response.ok) {
      closeModals()
      await loadUsers()
      await loadStats()
      toast.showToast('User created successfully')
    } else {
      const data = await response.json()
      toast.showToast(data.message || 'Failed to create user', 'error')
    }
  } catch (error) {
    console.error('Failed to create user:', error)
    toast.showToast('Failed to create user', 'error')
  }
}

const editUser = (user) => {
  userForm.value = {
    id: user.id,
    name: user.name,
    email: user.email,
    password: '',
    is_admin: user.is_admin
  }
  showEditModal.value = true
}

const updateUser = async () => {
  try {
    const response = await apiCall(`users/${userForm.value.id}`, {
      method: 'PUT',
      body: JSON.stringify(userForm.value)
    })
    
    if (response.ok) {
      closeModals()
      await loadUsers()
      await loadStats()
      toast.showToast('User updated successfully')
    } else {
      const data = await response.json()
      toast.showToast(data.message || 'Failed to update user', 'error')
    }
  } catch (error) {
    console.error('Failed to update user:', error)
    toast.showToast('Failed to update user', 'error')
  }
}

const deleteUser = async (userId) => {
  const shouldDelete = await confirm({
    title: 'Delete user',
    message: 'This will permanently remove the user and their related data. This action cannot be undone.',
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel',
    type: 'danger',
  })

  if (!shouldDelete) {
    return
  }
  
  try {
    const response = await apiCall(`users/${userId}`, {
      method: 'DELETE'
    })
    
    if (response.ok) {
      await loadUsers()
      await loadStats()
      toast.showToast('User deleted successfully')
    } else {
      const data = await response.json()
      toast.showToast(data.message || 'Failed to delete user', 'error')
    }
  } catch (error) {
    console.error('Failed to delete user:', error)
    toast.showToast('Failed to delete user', 'error')
  }
}

const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  userForm.value = {
    id: null,
    name: '',
    email: '',
    password: '',
    is_admin: false
  }
}

// Return a usable image URL for a user. Handles full URLs, data URIs,
// and local storage paths (prefixing with /storage when needed).
const getUserImage = (user) => {
  if (!user) return `https://ui-avatars.com/api/?name=Unknown&background=random`

  const name = encodeURIComponent(user.name || 'Unknown')

  if (user.image) {
    const url = user.image
    if (url.startsWith('http') || url.startsWith('//') || url.startsWith('data:')) {
      return url
    }
    return url.startsWith('/') ? url : `/storage/${url}`
  }

  return `https://ui-avatars.com/api/?name=${name}&background=random`
}

const previousPage = () => {
  if (currentPage.value > 1) {
    loadUsers(currentPage.value - 1)
  }
}

const nextPage = () => {
  if (currentPage.value < users.value.last_page) {
    loadUsers(currentPage.value + 1)
  }
}

const logout = () => {
  localStorage.removeItem('admin_token')
  localStorage.removeItem('admin_user')
  router.push('/admin')
}

onMounted(() => {
  checkAuth()
  loadStats()
  loadActiveUsers()
  loadUsers()
  
  // Auto-refresh stats every 30 seconds
  statsInterval = setInterval(() => {
    loadStats()
    loadActiveUsers()
  }, 30000)
})

onUnmounted(() => {
  if (statsInterval) {
    clearInterval(statsInterval)
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">Admin: {{ adminUser?.name }}</span>
            <button 
              @click="logout" 
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="shrink-0 bg-blue-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.total_users }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="shrink-0 bg-green-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Regular Users</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.regular_users }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="shrink-0 bg-purple-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Admin Users</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.admin_users }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="shrink-0 bg-yellow-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Active Users</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.active_users_count }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Users -->
      <div class="bg-white shadow rounded-lg mb-8">
        <div class="px-4 py-5 sm:px-6 flex items-center justify-between gap-4">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">Active Users</h3>
            <p class="mt-1 text-sm text-gray-500">People seen in the last 5 minutes</p>
          </div>
          <div class="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
            {{ stats.active_users_count || activeUsers.length || 0 }} online
          </div>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div v-if="activeUsers.length" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div
              v-for="activeUser in activeUsers"
              :key="activeUser.id"
              class="rounded-xl border border-gray-200 bg-gray-50 p-4"
            >
              <div class="flex items-start justify-between gap-4">
                <div>
                  <div class="flex items-center gap-2">
                    <h4 class="text-sm font-semibold text-gray-900">{{ activeUser.name }}</h4>
                    <span
                      class="rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
                      :class="activeUser.is_admin ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'"
                    >
                      {{ activeUser.is_admin ? 'Admin' : 'User' }}
                    </span>
                  </div>
                  <p class="mt-1 text-sm text-gray-600">{{ activeUser.email }}</p>
                </div>
                <span class="h-3 w-3 rounded-full bg-emerald-500" aria-hidden="true"></span>
              </div>
              <p class="mt-4 text-xs text-gray-500">
                Last seen {{ new Date(activeUser.last_seen).toLocaleString() }}
              </p>
            </div>
          </div>
          <p v-else class="text-sm text-gray-500">No active users right now.</p>
        </div>
      </div>

      <!-- User Management Section -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">User Management</h3>
            <button 
              @click="showCreateModal = true" 
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Add New User
            </button>
          </div>

          <!-- Users Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categories</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in users.data" :key="user.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="shrink-0 h-10 w-10">
                        <img 
                          class="h-10 w-10 rounded-full" 
                          :src="getUserImage(user)" 
                          :alt="user.name"
                        >
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      :class="user.is_admin ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'"
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    >
                      {{ user.is_admin ? 'Admin' : 'User' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.transactions_count || 0 }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.categories_count || 0 }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      @click="editUser(user)" 
                      class="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Edit
                    </button>
                    <button 
                      @click="deleteUser(user.id)" 
                      :disabled="user.id === adminUser?.id"
                      class="text-red-600 hover:text-red-900 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="mt-6 flex justify-between items-center">
            <div class="text-sm text-gray-700">
              Showing {{ users.from || 0 }} to {{ users.to || 0 }} of {{ users.total || 0 }} results
            </div>
            <div class="flex space-x-2">
              <button 
                @click="previousPage()" 
                :disabled="!users.prev_page_url" 
                class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button 
                @click="nextPage()" 
                :disabled="!users.next_page_url" 
                class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Create/Edit User Modal -->
    <div 
      v-if="showCreateModal || showEditModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      @click.self="closeModals()"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {{ showEditModal ? 'Edit User' : 'Create New User' }}
          </h3>
          <form @submit.prevent="showEditModal ? updateUser() : createUser()" class="mt-4 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Name</label>
              <input 
                type="text" 
                v-model="userForm.name" 
                required
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                v-model="userForm.email" 
                required
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                v-model="userForm.password" 
                :required="!showEditModal"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
            </div>
            <div>
              <label class="flex items-center">
                <input 
                  type="checkbox" 
                  v-model="userForm.is_admin" 
                  class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                <span class="ml-2 text-sm text-gray-700">Admin User</span>
              </label>
            </div>
            <div class="flex justify-end space-x-3">
              <button 
                type="button" 
                @click="closeModals()" 
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                {{ showEditModal ? 'Update' : 'Create' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
