<!--
 * @Description: 登录页
 * @Author: wangqi
 * @Date: 2020-06-01 14:18:50
 * @LastEditTime: 2020-06-21 19:04:46
-->
<template>
<div class="login-page" :style="bgBanner">
    <div class="container">
        <p class="title">登录</p>
        <div class="user-ipt">
            <el-input size="medium" placeholder="请输入用户名..." prefix-icon="el-icon-s-custom" v-model="accountInfo" @blur="verifyAccount"></el-input>
            <p class="error">{{accountError}}</p>
        </div>

        <div class="password-ipt">
            <el-input show-password size="medium" placeholder="请输入密码" prefix-icon="el-icon-goods" v-model="pwdInfo" @blur="verifyPwd"></el-input>
            <p class="error">{{pwdError}}</p>
        </div>

        <el-button type="primary" @click="submit">登录</el-button>

        <p class="account">
            <span @click="register">注册账号</span> |
            <span @click="forgetPwd">忘记密码</span>
        </p>
    </div>
</div>
</template>

<script>
import {
    api_login
} from "@/api/index.js";
import Store from "@/tools/Store";

import {
    Notification
} from "element-ui";

export default {
    name: "login",
    data() {
        return {
            accountInfo: "",
            pwdInfo: "",
            accountError: "",
            pwdError: "",
            // 背景图属性
            bgBanner: {},
            redirect: undefined
        };
    },
    created() {
        // 背景图片
        let day = new Date().getDay();
        this.bgBanner.backgroundImage =
            "url(" + require("@/assets/images/login/bg0" + day + ".jpg") + ")";
    },
    watch: {
        $route: {
            handler: function (route) {
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true
        }
    },
    methods: {
        /**
         * @description: 验证用户名输入
         * @param {type}
         * @return:
         */
        verifyAccount(e) {
            if (!this.accountInfo) {
                this.accountError = "用户名输入有误";
            }
        },

        /**
         * @description: 验证密码输入
         * @param {type}
         * @return:
         */
        verifyPwd() {
            if (!this.pwdInfo) {
                this.pwdError = "请输入正确密码";
            }
        },

        /**
         * @description: 登录
         * @param {type}
         * @return:
         */
        submit(e) {
            var form = {};
            form.username = this.accountInfo;
            form.password = this.pwdInfo;
            let auth = {
                username: this.accountInfo,
                password: this.pwdInfo
            };

            this.$store
                .dispatch("user/login", auth)
                .then(() => {
                    this.$router.push({
                        path: this.redirect || "/"
                    });
                })
                .catch(() => {
                    Notification.error({
                        title: "提示",
                        message: "登录失败!"
                    });
                });
        },
        /**
         * @description: 注册
         * @param {type}
         * @return:
         */
        register() {
            this.$router.push({
                path: `/register`
            });
        },

        /**
         * @description: 忘记密码
         * @param {type}
         * @return:
         */
        forgetPwd() {
            console.log("忘记密码");
        }
    }
};
</script>

<style lang="scss">
.login-page {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}

.login-page .container {
    background: rgba(255, 255, 255, 0.5);
    width: 300px;
    text-align: center;
    border-radius: 10px;
    padding: 30px;
}

.user-ipt,
.password-ipt {
    margin: auto;
    width: 200px;
}

.error {
    color: red;
    text-align: left;
    margin: 5px auto;
    font-size: 12px;
    padding-left: 30px;
    height: 20px;
}

.account {
    margin-top: 30px;
}

.account span {
    cursor: pointer;
    font-size: 14px;
}
</style>
