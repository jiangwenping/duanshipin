--页面 Template
<template>
  <div id="app" class="container" style="width: 100%;">
    <div class="col-md-12 ">
      <div class="row page-header" style="margin: unset;text-align: center;">
        <div class="col-md-12 ">
          <form class="form-horizontal row">
            <p><br></p>
            <p><br></p>
            <div class="col-md-4">
              <div class="form-group">
                <label class="control-label col-md-5">架构类型:</label>
                <div class="col-md-7">
                  <select v-model="treeType" class="form-control" @change="changeTree(treeType)">
                    <option value="OG00">A树</option>
                    <option value="OG01">B树</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label class="control-label col-md-5">对应组织:</label>
                <div class="col-md-7">
                  <select v-model="orgName" class="form-control" @change="changeOrg(orgName)">
                    <option v-for="item in orgList" :key="item.item_z_cn_all_name1" :label="item.item_z_cn_all_name1"
                            :value="item.item_z_cn_all_name1"/>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <div class="col-md-7">
                  <button class="btn btn-primary" data-loading-text="Loading..."
                          type="button" @click="downTree()">架构树下载
                  </button>
                  <!--<button class="btn btn-primary" data-loading-text="Loading..."
                          type="button" @click="enlarge()">放大</button>-->
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <p><br></p>
      <div class="text-center">
        <vue2-org-tree
            ref="imageDom"
            :collapsable="collapsable"
            :data="data"
            :horizontal="horizontal"
            :label-class-name="labelClassName"
            :render-content="renderContent"
            selected-class-name="bg-tomato"
            selected-key="selectedKey"
            @on-expand="onExpand"
            @on-node-click="onNodeClick"
        />
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import "vue2-org-tree/dist/style.css";
import html2canvas from "html2canvas";

const instance = axios.create({});

export default {

  data() {
    return {
      toolBar: {
        scale: false
      },
      dataSourceList: [],
      tableColumn: [],
      data: null,
      expandAll: false,
      horizontal: false,
      collapsable: true,
      labelClassName: "bg-lightpink",
      treeType: "OG00",
      orgName: "",
      orgList: [],
      downName: "架构树.png"
    }
  },
  mounted: async function () {
    let userId = this.getUrlParam("userId");
    await this.getOrg(userId);
    console.log(this.orgList)
  },
  methods: {
    async getOrg(userId) {
      let param = {};
      param.userId = userId;
      let orgUrl = "~~~~";
      let that = this;
      await instance.post(orgUrl, param).then(result => {
        console.log(result);
        if (result.data) {
          that.orgList = result.data;
        }
      })
    },
    getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.hash.substr(10).match(reg);  //匹配目标参数
      if (r != null) return decodeURI(r[2]);
      return null; //返回参数值
    },

    /*labelClassName: function(data) {
    return 'clickable-node'
    },*/
    renderContent: function (h, data) {
      if (this.treeType == "OG00") {
        return (
            <div>
              <div>
                <span>{data.label}</span>
              </div>
            </div>
        );
      } else if (this.treeType == "OG01") {
        return (
            <div>
              <div>
                <span>{data.label}</span>
              </div>
              <div style="font-size:12px;line-height:20px;">{data.rate}</div>
            </div>
        );
      }

//return data.label
    },
    async downTree() {
      html2canvas(this.$refs.imageDom.$el, {
        allowTaint: false, // 是否允许跨域图像污染画布
        useCORS: true, // 使用CO RS从服务器加载图像，必须为true否则img图片可能显示不出来
// x: 裁剪画布x坐标,
// y: 裁剪画布y坐标,
      }).then((canvas) => {
// 点击保存操作
        const link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.setAttribute("download", this.downName);
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
      });
//this.horizontal = true;
      /*let that = this;
      await setTimeout(function () {
      that.$DowloadPdf(['org-tree-container'], that.treeType == "OG00" ? "管理树" : "法人树");
      //that.horizontal = false;
      }, 500);*/
//this.horizontal = false;
    },
    changeTree(treeType) {
      debugger;
      if (!this.orgName) {
        return;
      }
      if (treeType == "OG00") {
        this.downName = "管理树.png";
      } else if (treeType == "OG01") {
        this.downName = "法人树.png";
      }
      let init = {};
      init.id = "0";
      if (treeType == "OG00" && (this.orgName == '~~' || this.orgName == '~~')) {
        init.label = "~~";
      } else {
        init.label = this.orgName;
      }
      init.rate = "";
      init.children = [{}];
      this.data = init;
      this.$set(this.data, 'expand', false)
    },
    changeOrg(orgName) {
      let init = {};
      init.id = "0";
      if (this.treeType == 'OG00' && (orgName == '~~' || orgName == '~~')) {
        init.label = "~~";
      } else {
        init.label = orgName;
      }
      init.rate = "";
      init.children = [{}];
      this.data = init;
      this.$set(this.data, 'expand', false)
    },

    onExpand: function (e, data) {
      let url = "~~~";
      let param = {};
      param.orgName = data.label;
      param.queryType = this.treeType;
      instance.post(url, param).then(result => {
        console.log(result);
        let arr = [];
        if (result.data) {
          for (let i = 0; i < result.data.length; i++) {
            let res = result.data[i];
            let temp = {};
            temp.id = res.id;
            temp.label = res.item_z_cn_all_name1;
            if (res.item_z_group_hci_rat == undefined) {
              temp.rate = "";
            } else {
              temp.rate = res.item_z_group_hci_rat + "%";
            }
            temp.children = [{}];
            arr.push(temp);
          }
        }
        data.children = arr;
        if ('expand' in data) {
          data.expand = !data.expand

          if (!data.expand && data.children) {
            this.collapse(data.children)
          }
        } else {
          this.$set(data, 'expand', true)
        }
      });
    },
    onNodeClick: function (e, data) {
      console.log('onNodeClick: %o', data)
      this.$set(data, 'selectedKey', !data.selectedKey)
    },
    collapse: function (list) {
      var _this = this
      list.forEach(function (child) {
        if (child.expand) {
          child.expand = false
        }

        child.children && _this.collapse(child.children)
      })
    },
    expandChange: function () {
      this.toggleExpand(this.data, this.expandAll)
    },
    toggleExpand: function (data, val) {
      var _this = this
      if (Array.isArray(data)) {
        data.forEach(function (item) {
          _this.$set(item, 'expand', val)
          if (item.children) {
            _this.toggleExpand(item.children, val)
          }
        })
      } else {
        this.$set(data, 'expand', val)
        if (data.children) {
          _this.toggleExpand(data.children, val)
        }
      }
    }
  }

}
</script>


<style>
.row_box {
  border: 1px solid darkgoldenrod;
}

.org-tree-node-label {
  white-space: nowrap;
}

.bg-white {
  background-color: white;
}

.bg-orange {
  background-color: orange;
}

.bg-gold {
  background-color: gold;
}

.bg-gray {
  background-color: gray;
}

.bg-lightpink {
  /*background-color: deepskyblue;*/
  background-color: deepskyblue;
}

.bg-chocolate {
  background-color: chocolate;
}

.bg-tomato {
  background-color: tomato;
}

.clickable-node {
  cursor: pointer;
}


</style>