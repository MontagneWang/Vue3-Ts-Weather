<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { useI18n } from "vue-i18n";

const { t } = useI18n();

</script>

<template>
	<div id="SiteChoose" class="flex flex-wrap items-center">
    <el-dropdown>
      <el-button type="primary">
        {{t('SiteChoose')}} | <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <router-link to="/">{{t('WeatherSite')}}</router-link>
					</el-dropdown-item>
					<el-dropdown-item>
            <router-link to="/ling">{{t('LingSongs')}}</router-link>
					</el-dropdown-item>
					<el-dropdown-item>
            <el-link type="primary" href="https://download.xn--fjqs22eumn.cn/" target="_blank">{{t('DownloadSite')}}</el-link>
					</el-dropdown-item>
					<el-dropdown-item>
            <el-link type="primary" href="https://xn--fjqs22eumn.cn/" target="_blank">{{t('PrimarySite')}}</el-link>
					</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

  <el-select v-model="$i18n.locale"
					  class="m-2"
					  placeholder="选择语言"
					  size="small">
    <el-option
      v-for="locale in $i18n.availableLocales"
	    :key="`locale-${locale}`"
	    :value="locale"
    >
      {{ locale }}
	  </el-option>
  </el-select>

	<router-view v-slot="{ Component }">
		<keep-alive>
			<Component :is="Component" />
		</keep-alive>
	</router-view>

<!--	这样无法缓存页面 -->
<!--	<keep-alive>-->
<!--		<router-view/>-->
<!--	</keep-alive>-->
</template>

<style scoped lang="scss">
a{
	text-decoration: none;
	color: rgb(64, 158, 255);
}
#SiteChoose{
	position: fixed;
	left: 40px;
	top: 35px;
}
div.el-select.el-select--small.m-2{
	position: fixed;
	left: 40px;
	top: 235px;
	width: 115px !important;
	height: 32px;
}

.example-showcase .el-dropdown + .el-dropdown {
	margin-left: 15px;
}
.example-showcase .el-dropdown-link {
	cursor: pointer;
	color: var(--el-color-primary);
	display: flex;
	align-items: center;
}

</style>
