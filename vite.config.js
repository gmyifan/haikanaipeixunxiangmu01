import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@views': resolve(__dirname, 'src/views'),
      '@data': resolve(__dirname, 'src/data'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@stores': resolve(__dirname, 'src/stores'),
      '@styles': resolve(__dirname, 'src/styles')
    }
  },
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: process.env.NODE_ENV === 'development',
    minify: 'terser',
    target: 'es2015',
    terserOptions: {
      compress: {
        // 生产环境移除 console.log/info/debug，但保留 error/warn
        drop_console: false, // 不直接移除所有console
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2
      },
      mangle: {
        safari10: true
      }
    },
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
        // 优化代码分割
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
          if (facadeModuleId) {
            const fileName = facadeModuleId.split('/').pop()
            if (fileName.includes('view')) {
              return 'js/views/[name]-[hash].js'
            }
            if (fileName.includes('component')) {
              return 'js/components/[name]-[hash].js'
            }
          }
          return 'js/[name]-[hash].js'
        },
        manualChunks: {
          // 将大型第三方库分离到单独的chunk
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'ui-vendor': ['element-plus', '@element-plus/icons-vue'],
          'chart-vendor': ['echarts'],
          'animation-vendor': ['gsap'],
          'utils-vendor': ['d3']
        }
      }
    },
    // 启用CSS代码分割
    cssCodeSplit: true,
    // 构建时报告
    reportCompressedSize: true,
    // 启用chunk大小警告
    chunkSizeWarningLimit: 1000
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
    cors: true,
    // 开发服务器性能优化
    hmr: {
      overlay: true
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    open: true
  },
  // 优化依赖
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      'element-plus',
      '@element-plus/icons-vue',
      'echarts',
      'd3',
      'gsap'
    ],
    exclude: []
  },
  // 定义全局常量
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false
  }
})