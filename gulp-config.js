export const DIR = {
    DIST: 'dist',
    SRC: 'src'
}
export const css = {
    dist: {
        name: {
            my: `main.css`,
            vendor: `vendor.min.css`
        },
        dir: `${DIR.DIST}/stylesheets`
    },
    src: {
        postcss: `${DIR.SRC}/postcss/main.css`
    }
}
export const scripts = {
    dist: {
        name: {
            vendor: `vendor.min.js`,
            my: `app.js`,
        },
        dir: `${DIR.DIST}/javascripts`
    },
    src: {
        typescript: `${DIR.SRC}/typescript/build.ts`
    }
}