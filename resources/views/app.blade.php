<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @vite
        @routes
        @inertiaHead
    </head>
    <body>
        <script>
            window.__vite_plugin_react_preamble_installed__ = true
        </script>
        @inertia
    </body>
</html>
