import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from "unplugin-auto-import/vite"
import Components from 'unplugin-vue-components/vite'
import {
    ElementPlusResolver,
    AntDesignVueResolver,
    VantResolver,
    HeadlessUiResolver,
    ElementUiResolver
} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(),
        AutoImport({
            imports: ["vue", "vue-router"], // 自动导入vue和vue-router相关函数
            include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
            dts: "src/auto-import.d.ts" // 生成 `auto-import.d.ts` 全局声明
        }),
        Components({
            // ui库解析器，也可以自定义
            resolvers: [
                ElementPlusResolver(),
                AntDesignVueResolver(),
                VantResolver(),
                HeadlessUiResolver(),
                ElementUiResolver()
            ]
        })],
    server: {
        port: 5173,
        open: true,
        // 配置代理
        proxy: {
            // 请求的路径前缀只要是 /bili 就会被拦截走这个代理
            '/bili': {
                /**
                 *  请求的目标资源再经过替换成 /httphwm/getList 后，
                 *  会加上 http://127.0.0.1:9693 这个前缀，
                 *  最后请求的URL为: http://127.0.0.1:9693/httphwm/getList
                 */
                target: 'https://api.bilibili.com/x/web-interface',
                ws: true,
                changeOrigin: true,
                // 拦截到的请求路径 testaxios/httphwm/getList，/testaxios会被替换成空
                rewrite: (path) => path.replace(/^\/bili/, ''),
            },
        }
    },
})
