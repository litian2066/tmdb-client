export const utils = {
    /**
     * 判断内容是否为空
     * @param val
     * @returns {boolean}
     */
    isNotEmpty(val) {
        return val !== null && val !== '' && val !== undefined
    },
    /**
     * 判断数据内容是否为空
     * @param val
     * @returns {boolean|boolean}
     */
    isNotEmptyArray(val) {
        return val !== null && val !== '' && val !== undefined && val.length > 0
    },
    isEmptyArray(val) {
        return val === null || val === '' || val === undefined || val.length === 0
    }
}