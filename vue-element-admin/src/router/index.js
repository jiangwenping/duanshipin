import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'


/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () => import('@/views/login/auth-redirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/error-page/401'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                name: 'Dashboard',
                meta: {title: '首页', icon: 'dashboard', affix: true}
            }
        ]
    },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
    {
        path: '/example',
        component: Layout,
        name: 'Example',
        meta: {
            title: '账号运营',
            icon: 'el-icon-data-line'
        },
        children: [
            {
                path: 'create',
                component: () => import('@/views/example/create'),
                name: 'CreateArticle',
                meta: {title: '账号管理', icon: 'el-icon-monitor'}
            },
            {
                path: 'edit',
                component: () => import('@/views/example/edit'),
                name: 'EditArticle',
                meta: {title: '智能发布', icon: 'el-icon-s-promotion'},
            },
            {
                path: 'list',
                component: () => import('@/views/example/list'),
                name: 'ArticleList',
                meta: {title: '视频发布', icon: 'el-icon-video-camera'}
            }
        ]
    },
    {
        path: '/video',
        component: Layout,
        name: 'ErrorPages',
        meta: {
            title: '视频创作',
            icon: 'el-icon-s-check'
        },
        children: [
            {
                path: 'create',
                component: () => import('@/views/video-create/index'),
                name: 'create',
                meta: {title: '智能创作', icon: 'el-icon-s-platform'}
            },
            {
                path: '4041',
                component: () => import('@/views/error-page/404'),
                name: 'Page404',
                meta: {title: 'AI智能创作', icon: 'el-icon-magic-stick'}
            },
            {
                path: '4042',
                component: () => import('@/views/error-page/404'),
                name: 'Page404',
                meta: {title: '视频模版', icon: 'el-icon-video-play'}
            },
            {
                path: '4043',
                component: () => import('@/views/error-page/404'),
                name: 'Page404',
                meta: {title: '直播剪辑', icon: 'el-icon-scissors'}
            }
        ]
    },
    {
        path: '/error-log',
        component: Layout,
        name: 'ErrorPages',
        meta: {
            title: '智能管理',
            icon: 'el-icon-goblet-square'
        },
        children: [
            {
                path: 'log',
                component: () => import('@/views/error-log/index'),
                name: 'ErrorLog1',
                meta: {title: '视频管理', icon: 'el-icon-camera'}
            },
            {
                path: 'log1',
                component: () => import('@/views/error-log/index'),
                name: 'ErrorLog2',
                meta: {title: '评论管理', icon: 'el-icon-chat-dot-square'}
            },
            {
                path: 'log2',
                component: () => import('@/views/error-log/index'),
                name: 'ErrorLog3',
                meta: {title: '私信管理', icon: 'el-icon-chat-square'}
            },
            {
                path: 'log3',
                component: () => import('@/views/error-log/index'),
                name: 'ErrorLog4',
                meta: {title: '线索管理', icon: 'el-icon-collection'}
            }
        ]
    },
    {
        path: '/excel',
        component: Layout,
        name: 'Excel',
        meta: {
            title: '运营管理',
            icon: 'el-icon-s-marketing'
        },
        children: [
            {
                path: 'export-excel',
                component: () => import('@/views/excel/export-excel'),
                name: 'ExportExcel',
                meta: {title: '智能触客', icon: 'el-icon-headset'}
            },
            {
                path: 'export-selected-excel',
                component: () => import('@/views/excel/select-excel'),
                name: 'SelectExcel',
                meta: {title: 'SEO热词', icon: 'el-icon-search'}
            },
            {
                path: 'export-merge-header',
                component: () => import('@/views/excel/merge-header'),
                name: 'MergeHeader',
                meta: {title: '素材管理', icon: 'el-icon-picture'}
            },
            {
                path: 'upload-excel',
                component: () => import('@/views/excel/upload-excel'),
                name: 'UploadExcel',
                meta: {title: 'WebHook', icon: 'el-icon-apple'}
            }
        ]
    },
    {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
