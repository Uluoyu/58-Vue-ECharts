// 定义两套主题之下的原生html样式值
const theme = {
    chalk: {
        // 背景颜色
        backgroundColor: '#161522',
        // 标题文字颜色
        titleColor: '#ffffff',
        // 切换主题按钮的图片路径
        themeSrc: 'qiehuan_dark.png',
        // 头部的线条
        headerBorderSrc: 'header_border_dark.png',
        sellerAxisPointerColor: '#2D3443',
    },
    // 该主题未启用
    vintage: {
        backgroundColor: '#eeeeee',
        titleColor: "#000000",
        themeSrc: 'qiehuan_light.png',
        headerBorderSrc: 'header_border_light.png',
        sellerAxisPointerColor: '#f1f2f6',
    }
}


export function getThemeValue(themeName) {
    return theme[themeName]
}