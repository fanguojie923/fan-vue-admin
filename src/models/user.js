/* eslint-disable class-methods-use-this */
import {
    post,
    get,
    put,
} from '@/plugins/axios'
import { saveTokens, saveAccessToken } from '../utils/token'

const SUPER_VALUE = 2
const ACTIVE_VALUE = 1

export default class User {
    isActive = null

    // 当前用户是否在激活状态
    email = null

    // 邮箱
    groupId = null

    // 权限分组id
    nickname = null

    // 昵称
    isSuper = null

    // 是否为超级管理员
    auths = [] // 拥有的权限

    constructor(active, email, groupId, nickname, _super, avatar, auths) {
        this.isActive = active === ACTIVE_VALUE
        this.email = email
        this.groupId = groupId
        this.nickname = nickname
        this.avatar = avatar
        this.isSuper = _super === SUPER_VALUE
        this.auths = auths || []
    }

    /**
     * 用户注册，正式发布时将废弃
     * @param {object} data 注册信息
     */
    static register(data) {
        return post('system/user/register', data)
    }

    /**
     * 登陆获取tokens
     * @param {string} username 昵称
     * @param {string} password 密码
     */
    static async getToken(username, password) {
        const tokens = await post('system/user/login', {
            username,
            password,
        })
        saveTokens(tokens.access_token, tokens.refresh_token)
        return tokens
    }

    /**
     * 获取当前用户信息，并返回User实例
     */
    static async getInformation() {
        const info = await get('system/user/information')
        return new User(info.active, info.email, info.group_id, info.nickname, info.admin, info.avatar)
    }

    /**
     * 获取当前用户信息和所拥有的权限
     */
    static async getAuths() {
        const info = await get('system/user/auths')
        return new User(info.active, info.email, info.group_id, info.nickname, info.admin, info.avatar, info.auths)
    }

    /**
     * 刷新令牌
     */
    static async getRefreshToken() {
        const res = await get('system/user/refresh')
        saveAccessToken(res.access_token)
    }


    /**
     * 用户修改密码
     * @param {string} newPassword 新密码
     * @param {string} confirmPassword 确认新密码
     * @param {string} oldPassword 旧密码
     */
    static updatePassword({ old_password, new_password, confirm_password }) {
        return put('system/user/change_password', {
            new_password,
            confirm_password,
            old_password,
        })
    }
}
