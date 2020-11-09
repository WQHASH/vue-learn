<!--
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-06-02 12:42:24
 * @LastEditTime: 2020-11-10 00:47:30
-->
<template>
  <div class="register-page" :style="bgBanner">
    <div class="container">
      <p class="title">注册</p>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="user">
          <el-input
            type=""
            v-model="ruleForm.user"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { registerUser } from "@/api/index.js";
export default {
  data() {
    var userName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        user: "",
        pass: "",
        checkPass: "",
        age: "",
      },
      rules: {
        user: [
          {
            validator: userName,
            trigger: "blur",
          },
        ],
        pass: [
          {
            validator: validatePass,
            trigger: "blur",
          },
        ],
        checkPass: [
          {
            validator: validatePass2,
            trigger: "blur",
          },
        ],
        age: [
          {
            validator: checkAge,
            trigger: "blur",
          },
        ],
      },
      // 背景图属性
      bgBanner: {},
    };
  },
  created() {
    // 背景图片
    let day = new Date().getDay();
    this.bgBanner.backgroundImage =
      "url(" + require("@/assets/images/login/bg0" + day + ".jpg") + ")";
  },
  methods: {
    /**
     * @description: 提交
     * @param {*} formName
     * @return {*}
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let form = {};          
          form.name = this.ruleForm.user;
          form.password = this.ruleForm.pass;
          form.age = this.ruleForm.age;
          registerUser(form)
            .then(function (res) {
              console.log(res);
            })
            .catch((error) => {
              console.log("注册失败!");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submit() {},
  },
};
</script>

<style lang="scss">
.register-page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.register-page .container {
  background: rgba(255, 255, 255, 0.5);
  width: 600px;
  height: 400px;
  text-align: center;
  border-radius: 10px;
  padding: 30px;

  p {
    font-size: 25px;
  }
}
</style>
