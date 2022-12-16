export default [
    {
        route: 'movie',
        menuName: '电影'
    },
    {
        route: 'dramaSeriesList',
        menuName: '剧集',
        children: [
            {
                route: 'dramaSeriesHot',
                menuName: '热门'
            },
            {
                route: 'dramaSeriesHighScore',
                menuName: '高分'
            }
        ]
    },
    {
        route: 'person',
        menuName: '人物'
    },
    {
        route: 'more',
        menuName: '更多'
    }
]