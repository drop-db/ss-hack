export const MAC_FF_CONSTRAINS = [
    {video: {width: {exact: 640}, height: {exact: 360}}, audio: true},
    {video: {width: 800, height: 450}, audio: true},
    {video: true, audio: true},
    {video: false, audio: true},
    {video: true, audio: false},
];

export const FF_CONSTRAINS = [
    {video: {width: {exact: 640}, height: {exact: 360}}, audio: true},
    {video: {width: 800, height: 450}, audio: true},
    {video: true, audio: true},
    {video: false, audio: true},
    {video: true, audio: false},
];

export const CHROME_CONSTRAINS = [{
    video: {
        width: {exact: 640},
        height: {exact: 360},
        facingMode: 'user',
    }, audio: true,
},
    {
        video: {
            width: {exact: 640},
            height: {exact: 360},
        }, audio: true,
    },
    {video: false, audio: true}, {
        video: {
            width: {exact: 640},
            height: {exact: 360},
        }, audio: false,
    }];

export const SAFARI_CONSTRAINS = [{
    video: {
        aspectRatio: 16 / 9,
        width: {max: 640, min: 100},
        facingMode: {exact: 'user'},
    }, audio: true,
}, {video: {facingMode: {exact: 'user'}}, audio: true},
    {video: {aspectRatio: 16 / 9, width: {max: 640, min: 100}}, audio: true}, {video: true, audio: true},
    {video: true, audio: true}, {video: false, audio: true}, {video: true, audio: false}];

export const VIDEO_CONSTRAINS_FOR_PODIUM = [{video: {width: {exact: 1280}, height: {exact: 720}}, audio: true}];

export const LOWEST_VIDEO_CONSTRAINS = [
    {
        video: {
            width: {exact: 148},
            height: {exact: 83},
            facingMode: 'user',
        }, audio: true,
    },
    {
        video: {
            width: {exact: 160},
            height: {exact: 120},
            facingMode: 'user',
        }, audio: true,
    },
    {
        video: {
            width: {exact: 176},
            height: {exact: 144},
            facingMode: 'user',
        }, audio: true,
    },
    {
        video: {
            width: {exact: 320},
            height: {exact: 240},
            facingMode: 'user',
        }, audio: true,
    },
    {
        video: {
            width: {exact: 352},
            height: {exact: 288},
            facingMode: 'user',
        }, audio: true,
    },
    {
        video: {
            width: {exact: 640},
            height: {exact: 360},
            facingMode: 'user',
        }, audio: true,
    },
];
