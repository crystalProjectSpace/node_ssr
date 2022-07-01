module.exports = {
    PATHES: {
        ROOT: '/',
        DEFAULT: 'index.html',
        NOT_FOUND: '404.html'
    },

    MIME_TYPES: new Map([
        ['.html', 'text/html'],
        ['.js', 'text/javascript'],
        ['.css', 'text/css'],
        ['.json', 'application/json'],
        ['.png', 'image/png'],
        ['.jpg', 'image/jpg'],
        ['.gif', 'image/gif'],
        ['.svg', 'image/svg+xml'],
        ['.wav', 'audio/wav'],
        ['.mp4', 'video/mp4'],
        ['.woff', 'application/font-woff'],
        ['.ttf', 'application/font-ttf'],
        ['.eot', 'application/vnd.ms-fontobject'],
        ['.otf', 'application/font-otf'],
        ['.wasm', 'application/wasm']
    ]),

    DEFAULT_ENCODING: 'utf-8',
    
    DEFAULT_MIME_TYPE: 'application/octet-stream',
    
    NOT_FOUND: 'ENOENT',
    
    LOCALHOST: '127.0.0.1',
    
    NODE_PORT: 4000,
}