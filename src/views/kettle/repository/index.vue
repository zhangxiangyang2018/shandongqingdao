<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="82px">
      <el-form-item label="资源库名称" prop="repName">
        <el-input
          v-model="queryParams.repName"
          placeholder="请输入资源库名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
          :style="{width: '100%'}"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['kettle:repository:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['kettle:repository:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['kettle:repository:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['kettle:repository:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="repositoryList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="资源库名称" align="center" prop="repName" />
      <el-table-column label="资源库类型" align="center" prop="repType" :formatter="repTypeFormat" />
<!--      <el-table-column label="文件资源库路径" align="center" prop="repBasePath" />-->
<!--      <el-table-column label="资源库数据库类型" align="center" prop="dbType" :formatter="dbTypeFormat" />-->
      <el-table-column label="资源库数据库主机名或者IP地址" align="center" prop="dbHost" />
      <el-table-column label="资源库数据库名称" align="center" prop="dbName" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['kettle:repository:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['kettle:repository:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改资源库对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="资源库名称" prop="repName">
          <el-input v-model="form.repName" placeholder="请输入资源库名称" />
        </el-form-item>
        <el-form-item label="资源库类型" prop="repType">
          <el-select v-model="form.repType" placeholder="请选择资源库类型" :style="{width: '100%'}">
            <el-option
              v-for="dict in repTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录用户名" prop="repUsername">
          <el-input v-model="form.repUsername" placeholder="请输入登录用户名" />
        </el-form-item>
        <el-form-item label="登录密码" prop="repPassword">
          <el-input v-model="form.repPassword" placeholder="请输入登录密码" clearable show-password/>
        </el-form-item>
<!--        <el-form-item label="文件资源库路径" prop="repBasePath">-->
<!--          <el-input v-model="form.repBasePath" type="textarea" placeholder="请输入内容" />-->
<!--        </el-form-item>-->
        <el-form-item label="资源库数据库类型" prop="dbType">
          <el-select v-model="form.dbType" placeholder="请选择资源库数据库类型" :style="{width: '100%'}" >
            <el-option
              v-for="dict in dbTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源库数据库访问模式" prop="dbAccess">
          <el-select v-model="form.dbAccess" placeholder="请选择资源库数据库访问模式" :style="{width: '100%'}">
            <el-option
              v-for="dict in dbAccessOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源库主机名或者IP地址" prop="dbHost">
          <el-input v-model="form.dbHost" placeholder="请输入资源库数据库主机名或者IP地址" />
        </el-form-item>
        <el-form-item label="资源库数据库端口号" prop="dbPort">
          <el-input v-model="form.dbPort" placeholder="请输入资源库数据库端口号" />
        </el-form-item>
        <el-form-item label="资源库数据库名称" prop="dbName">
          <el-input v-model="form.dbName" placeholder="请输入资源库数据库名称" />
        </el-form-item>
        <el-form-item label="数据库登录账号" prop="dbUsername">
          <el-input v-model="form.dbUsername" placeholder="请输入数据库登录账号" />
        </el-form-item>
        <el-form-item label="数据库登录密码" prop="dbPassword">
          <el-input v-model="form.dbPassword" placeholder="请输入数据库登录密码" clearable show-password
                    :style="{width: '100%'}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="testConnection">测试连接</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listRepository, getRepository, delRepository, addRepository, updateRepository, exportRepository, testConnection } from "@/api/kettle/repository";

export default {
  name: "Repository",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 资源库表格数据
      repositoryList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 资源库类型字典
      repTypeOptions: [],
      // 资源库数据库类型字典
      dbTypeOptions: [],
      // 资源库数据库访问模式字典
      dbAccessOptions: [],
      // 是否删除字典
      delFlagOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        repName: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        repName: [
          { required: true, message: "资源库名称不能为空", trigger: "blur" }
        ],
        repType: [
          { required: true, message: "资源库类型不能为空", trigger: "change" }
        ],
        repUsername: [
          { required: true, message: "登录用户名不能为空", trigger: "blur" }
        ],
        repPassword: [
          { required: true, message: "登录密码不能为空", trigger: "blur" }
        ],
        dbType: [
          { required: true, message: "资源库数据库类型不能为空", trigger: "change" }
        ],
        dbAccess: [
          { required: true, message: "资源库数据库访问模式不能为空", trigger: "blur" }
        ],
        dbHost: [
          { required: true, message: "资源库数据库主机名或者IP地址不能为空", trigger: "blur" }
        ],
        dbPort: [
          { required: true, message: "资源库数据库端口号不能为空", trigger: "blur" }
        ],
        dbName: [
          { required: true, message: "资源库数据库名称不能为空", trigger: "blur" }
        ],
        dbUsername: [
          { required: true, message: "数据库登录账号不能为空", trigger: "blur" }
        ],
        dbPassword: [
          { required: true, message: "数据库登录密码不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("kettle_rep").then(response => {
      this.repTypeOptions = response.data;
    });
    this.getDicts("kettle_db_type").then(response => {
      this.dbTypeOptions = response.data;
    });
    this.getDicts("kettle_db_access").then(response => {
      this.dbAccessOptions = response.data;
    });
    this.getDicts("sys_delete_status").then(response => {
      this.delFlagOptions = response.data;
    });
  },
  methods: {
    /** 查询资源库列表 */
    getList() {
      this.loading = true;
      listRepository(this.queryParams).then(response => {
        this.repositoryList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 资源库类型字典翻译
    repTypeFormat(row, column) {
      return this.selectDictLabel(this.repTypeOptions, row.repType);
    },
    // 资源库数据库类型字典翻译
    dbTypeFormat(row, column) {
      return this.selectDictLabel(this.dbTypeOptions, row.dbType);
    },
    // 资源库数据库访问模式字典翻译
    dbAccessFormat(row, column) {
      return this.selectDictLabel(this.dbAccessOptions, row.dbAccess);
    },
    // 是否删除字典翻译
    delFlagFormat(row, column) {
      return this.selectDictLabel(this.delFlagOptions, row.delFlag);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        repName: null,
        repType: null,
        repUsername: null,
        repPassword: null,
        repBasePath: null,
        dbType: null,
        dbAccess: null,
        dbHost: null,
        dbPort: null,
        dbName: null,
        dbUsername: null,
        dbPassword: null,
        addTime: null,
        addUser: null,
        editTime: null,
        editUser: null,
        delFlag: "0"
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加资源库";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getRepository(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改资源库";
      });
    },
    /** 测试连接按钮 */
    testConnection() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          testConnection(this.form).then(response => {
            this.msgSuccess("连接成功");
          });
        }
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateRepository(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRepository(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除资源库编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delRepository(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有资源库数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportRepository(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
