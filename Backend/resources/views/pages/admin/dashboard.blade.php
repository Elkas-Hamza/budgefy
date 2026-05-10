<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Budgefy</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
</head>
<body class="bg-gray-100 min-h-screen" x-data="adminDashboard()">
    <!-- Header -->
    <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <div class="flex items-center space-x-4">
                    <span class="text-sm text-gray-600" x-text="'Admin: ' + adminUser?.name"></span>
                    <button @click="logout()" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
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
                        <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                            </svg>
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                                <dd class="text-lg font-medium text-gray-900" x-text="stats.total_users"></dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="p-5">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-sm font-medium text-gray-500 truncate">Regular Users</dt>
                                <dd class="text-lg font-medium text-gray-900" x-text="stats.regular_users"></dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="p-5">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 bg-purple-500 rounded-md p-3">
                            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-sm font-medium text-gray-500 truncate">Admin Users</dt>
                                <dd class="text-lg font-medium text-gray-900" x-text="stats.admin_users"></dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="p-5">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-sm font-medium text-gray-500 truncate">Active Users</dt>
                                <dd class="text-lg font-medium text-gray-900" x-text="stats.active_users_count"></dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- User Management Section -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">User Management</h3>
                    <button @click="showCreateModal = true" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
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
                            <template x-for="user in users.data" :key="user.id">
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-10 w-10">
                                                <img class="h-10 w-10 rounded-full" :src="user.image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) + '&background=random'" alt="">
                                            </div>
                                            <div class="ml-4">
                                                <div class="text-sm font-medium text-gray-900" x-text="user.name"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" x-text="user.email"></td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                                              :class="user.is_admin ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'"
                                              x-text="user.is_admin ? 'Admin' : 'User'"></span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" x-text="user.transactions_count || 0"></td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" x-text="user.categories_count || 0"></td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button @click="editUser(user)" class="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                                        <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-900" 
                                                :disabled="user.id === adminUser?.id">Delete</button>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="mt-6 flex justify-between items-center">
                    <div class="text-sm text-gray-700">
                        Showing <span x-text="users.from || 0"></span> to <span x-text="users.to || 0"></span> of <span x-text="users.total || 0"></span> results
                    </div>
                    <div class="flex space-x-2">
                        <button @click="previousPage()" :disabled="!users.prev_page_url" 
                                class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
                            Previous
                        </button>
                        <button @click="nextPage()" :disabled="!users.next_page_url" 
                                class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Create/Edit User Modal -->
    <div x-show="showCreateModal || showEditModal" x-cloak
         class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
         @click.self="closeModals()">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div class="mt-3">
                <h3 class="text-lg leading-6 font-medium text-gray-900" x-text="showEditModal ? 'Edit User' : 'Create New User'"></h3>
                <form @submit.prevent="showEditModal ? updateUser() : createUser()" class="mt-4 space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" x-model="userForm.name" required
                               class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" x-model="userForm.email" required
                               class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" x-model="userForm.password" :required="!showEditModal"
                               class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div>
                        <label class="flex items-center">
                            <input type="checkbox" x-model="userForm.is_admin" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                            <span class="ml-2 text-sm text-gray-700">Admin User</span>
                        </label>
                    </div>
                    <div class="flex justify-end space-x-3">
                        <button type="button" @click="closeModals()" 
                                class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm font-medium">
                            Cancel
                        </button>
                        <button type="submit" 
                                class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                            <span x-text="showEditModal ? 'Update' : 'Create'"></span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script>
        function adminDashboard() {
            return {
                adminUser: null,
                users: { data: [] },
                stats: {},
                showCreateModal: false,
                showEditModal: false,
                userForm: {
                    id: null,
                    name: '',
                    email: '',
                    password: '',
                    is_admin: false
                },
                currentPage: 1,

                init() {
                    this.checkAuth();
                    this.loadStats();
                    this.loadUsers();
                    
                    // Auto-refresh stats every 30 seconds
                    setInterval(() => this.loadStats(), 30000);
                },

                checkAuth() {
                    const token = localStorage.getItem('admin_token');
                    const user = localStorage.getItem('admin_user');
                    
                    if (!token || !user) {
                        window.location.href = '/admin';
                        return;
                    }
                    
                    this.adminUser = JSON.parse(user);
                },

                async apiCall(endpoint, options = {}) {
                    const token = localStorage.getItem('admin_token');
                    const response = await fetch(`${window.location.origin}/api/admin/${endpoint}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            ...options.headers
                        },
                        ...options
                    });
                    
                    if (response.status === 401 || response.status === 403) {
                        localStorage.removeItem('admin_token');
                        localStorage.removeItem('admin_user');
                        window.location.href = '/admin';
                        return;
                    }
                    
                    return response;
                },

                async loadStats() {
                    try {
                        const response = await this.apiCall('stats');
                        const data = await response.json();
                        this.stats = data;
                    } catch (error) {
                        console.error('Failed to load stats:', error);
                    }
                },

                async loadUsers(page = 1) {
                    try {
                        const response = await this.apiCall(`users?page=${page}`);
                        const data = await response.json();
                        this.users = data.users;
                        this.currentPage = page;
                    } catch (error) {
                        console.error('Failed to load users:', error);
                    }
                },

                async createUser() {
                    try {
                        const response = await this.apiCall('users', {
                            method: 'POST',
                            body: JSON.stringify(this.userForm)
                        });
                        
                        if (response.ok) {
                            this.closeModals();
                            this.loadUsers();
                            this.loadStats();
                        } else {
                            const data = await response.json();
                            alert(data.message || 'Failed to create user');
                        }
                    } catch (error) {
                        console.error('Failed to create user:', error);
                    }
                },

                editUser(user) {
                    this.userForm = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        password: '',
                        is_admin: user.is_admin
                    };
                    this.showEditModal = true;
                },

                async updateUser() {
                    try {
                        const response = await this.apiCall(`users/${this.userForm.id}`, {
                            method: 'PUT',
                            body: JSON.stringify(this.userForm)
                        });
                        
                        if (response.ok) {
                            this.closeModals();
                            this.loadUsers();
                            this.loadStats();
                        } else {
                            const data = await response.json();
                            alert(data.message || 'Failed to update user');
                        }
                    } catch (error) {
                        console.error('Failed to update user:', error);
                    }
                },

                async deleteUser(userId) {
                    if (!confirm('Are you sure you want to delete this user?')) {
                        return;
                    }
                    
                    try {
                        const response = await this.apiCall(`users/${userId}`, {
                            method: 'DELETE'
                        });
                        
                        if (response.ok) {
                            this.loadUsers();
                            this.loadStats();
                        } else {
                            const data = await response.json();
                            alert(data.message || 'Failed to delete user');
                        }
                    } catch (error) {
                        console.error('Failed to delete user:', error);
                    }
                },

                closeModals() {
                    this.showCreateModal = false;
                    this.showEditModal = false;
                    this.userForm = {
                        id: null,
                        name: '',
                        email: '',
                        password: '',
                        is_admin: false
                    };
                },

                previousPage() {
                    if (this.currentPage > 1) {
                        this.loadUsers(this.currentPage - 1);
                    }
                },

                nextPage() {
                    if (this.currentPage < this.users.last_page) {
                        this.loadUsers(this.currentPage + 1);
                    }
                },

                logout() {
                    localStorage.removeItem('admin_token');
                    localStorage.removeItem('admin_user');
                    window.location.href = '/admin';
                }
            }
        }
    </script>
</body>
</html>
