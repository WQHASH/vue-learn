<!--
 * @Description: 拓扑图列表页
 * @Author: wangqi
 * @Date: 2020-07-05 22:50:30
 * @LastEditTime: 2020-07-10 00:53:22
--> 
<style lang="scss" scoped>
.topology-list {
  .add-topology {
    float: right;
    margin: 0;
    font-size: 28px;
  }
}
</style>
<template>
  <div class="topology-list">
    <el-row>
      <span @click="createMethod()" class="el-icon-circle-plus-outline add-topology"></span>
    </el-row>

    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
      <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column>

      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="editMethod(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="deleteMethod(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  created() {},
  methods: {
    formatter(row, column) {
      return row.address;
    },
    rowClick(row, column, event) {},

    /**
     * @description: 新增拓扑图
     * @param {type}
     * @return:
     */
    createMethod() {
      console.log("createMethod");
    },

    /**
     * @description: 编辑拓扑图
     * @param index {number} 当前点击列表id
     * @param row {Object} 当前点击列表行信息
     * @return:
     */
    editMethod(index, row) {
      console.log("editMethod");
      this.$router.push({ path: `/topology/edit/${index + 1}` });
    },

    /**
     * @description: 删除拓扑图
     * @param index {number} 当前点击列表id
     * @param row {Object} 当前点击列表行信息
     * @return:
     */
    deleteMethod(index, row) {
      console.log("DeleteMethod");
      // this.$router.push({ path: `/topology/edit/${index + 1}` });
    }
  }
};
</script>
