@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
<img src="{{ rtrim(config('app.url'), '/') }}/favicon.png" class="logo" alt="{{ config('app.name') }}">
</a>
</td>
</tr>
