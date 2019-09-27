import detectBrowser from 'detect-browser';
import detect from 'detector';

export function isFirefox() {
    return detectBrowser.name === 'firefox';
}

export function isChrome() {
    return detectBrowser.name === 'chrome' || detect.browser.name === 'chrome';
}

export function isIpadChrome() {
    return ((detect && detect.browser && detect.browser.name === 'chrome') || detectBrowser.name === 'chrome') && isIpad();
}

export function isIos() {
    return detect.os.name.toLowerCase() === 'ios';
}
export function isMacChrome() {
    return detect.device.name === 'mac' && detect.browser.name === 'chrome';
}
export function isSafariBrowser() {
    return detect && detect.browser && detect.browser.name === 'safari';
}

export function isSafari() {
    return detectBrowser.name.toLowerCase() === 'safari' || detect.os.name.toLowerCase() === 'ios';
}
export function isMobile() {
    return Boolean(detect.os && (detect.os.name.toLowerCase() === 'android' || detect.os.name.toLowerCase() === 'ios'));
}

export function isWindows10() {
    return detect.os.name === 'windows' && detect.os.version === 10;
}

export function isStandalone() {
    return window && window.navigator && window.navigator.standalone;
}
export function isIpad() {
    return window && window.navigator && window.navigator.appVersion && window.navigator.appVersion.includes('iPad');
}

export function isSupportedSafari() {
    return detect && detect.browser && detect.browser.name === 'safari' && detect.browser.version >= 11;
}
