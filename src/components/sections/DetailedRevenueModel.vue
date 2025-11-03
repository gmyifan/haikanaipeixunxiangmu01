<template>
  <div class="detailed-revenue-model">
    <div class="section-header">
      <h3 class="section-title">
        <span class="title-icon">💰</span>
        多元化盈利模式详解
      </h3>
      <p class="section-subtitle">
        构建短、中、长期相结合的盈利模式，确保业务的健康和可持续发展
      </p>
    </div>

    <!-- 三种盈利模式 -->
    <div class="revenue-models">
      <div class="model-card short-term">
        <div class="card-header">
          <div class="model-icon">💻</div>
          <h4 class="model-title">模式一：培训服务收费</h4>
          <el-tag type="success" size="small">短期现金流</el-tag>
        </div>
        <div class="card-content">
          <div class="service-list">
            <div class="service-item">
              <div class="service-header">
                <el-icon class="service-icon"><Star /></el-icon>
                <span class="service-name">B2B企业内训</span>
              </div>
              <p class="service-detail">提供高客单价的定制化内训服务，解决企业具体业务痛点</p>
            </div>
            <div class="service-item">
              <div class="service-header">
                <el-icon class="service-icon"><Star /></el-icon>
                <span class="service-name">G2B政府项目</span>
              </div>
              <p class="service-detail">承接"教师AI素养提升"、"公务员AI轮训"等政府集中采购项目，获取稳定项目经费</p>
            </div>
            <div class="service-item">
              <div class="service-header">
                <el-icon class="service-icon"><Star /></el-icon>
                <span class="service-name">认证培训</span>
              </div>
              <p class="service-detail">联合长沙新视界等机构，开展"人工智能训练师"等认证培训，获取标准化培训收入</p>
            </div>
          </div>
        </div>
      </div>

      <div class="model-card mid-term">
        <div class="card-header">
          <div class="model-icon">📈</div>
          <h4 class="model-title">模式二："培训+"增值服务</h4>
          <el-tag type="warning" size="small">中期增长点</el-tag>
        </div>
        <div class="card-content">
          <div class="service-list">
            <div class="service-item">
              <div class="service-header">
                <el-icon class="service-icon"><Star /></el-icon>
                <span class="service-name">咨询与解决方案</span>
              </div>
              <p class="service-detail">从培训切入，为优质客户提供"诊断+咨询+工具（海看灵海）"的一体化解决方案，实现服务升维</p>
            </div>
            <div class="service-item">
              <div class="service-header">
                <el-icon class="service-icon"><Star /></el-icon>
                <span class="service-name">AI代运营服务</span>
              </div>
              <p class="service-detail">借鉴东升成GEO模式，为企业提供AIGC内容生成、AI搜索优化等代运营服务</p>
            </div>
            <div class="service-item">
              <div class="service-header">
                <el-icon class="service-icon"><Star /></el-icon>
                <span class="service-name">渠道产品包</span>
              </div>
              <p class="service-detail">为全省广电系统提供"AI培训产品包"，使其成为新的创收抓手，海看获得产品及服务分成</p>
            </div>
          </div>
        </div>
      </div>

      <div class="model-card long-term">
        <div class="card-header">
          <div class="model-icon">🏭</div>
          <h4 class="model-title">模式三：生态平台服务</h4>
          <el-tag type="primary" size="small">长期价值</el-tag>
        </div>
        <div class="card-content">
          <div class="service-list">
            <div class="service-item">
              <div class="service-header">
                <el-icon class="service-icon"><Star /></el-icon>
                <span class="service-name">标准制定与授权</span>
              </div>
              <p class="service-detail">主导广电垂类AIGC标准，获取认证授权费用</p>
            </div>
            <div class="service-item">
              <div class="service-header">
                <el-icon class="service-icon"><Star /></el-icon>
                <span class="service-name">线上平台收益</span>
              </div>
              <p class="service-detail">"海看AI在线学习平台"成熟后，通过课程付费、会员订阅等方式获利</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Star } from '@element-plus/icons-vue'

export default {
  name: 'DetailedRevenueModel',
  components: {
    Star
  }
}
</script>

<style scoped>
.detailed-revenue-model {
  margin: 32px 0;
  padding: 32px;
  background: #f8fafc;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
}

.section-header {
  text-align: center;
  margin-bottom: 32px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.title-icon {
  font-size: 28px;
}

.section-subtitle {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

/* 盈利模式卡片 */
.revenue-models {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.model-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.model-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f3f4f6;
}

.model-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.model-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  flex: 1;
}

.card-content {
  margin-top: 16px;
}

.service-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.service-item {
  background: #f9fafb;
  border-radius: 8px;
  padding: 16px;
  border-left: 4px solid #3b82f6;
}

.service-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.service-icon {
  color: #3b82f6;
  font-size: 16px;
}

.service-name {
  font-weight: 600;
  color: #1f2937;
  font-size: 14px;
}

.service-detail {
  color: #4b5563;
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
  padding-left: 24px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .detailed-revenue-model {
    padding: 20px;
    margin: 24px 0;
  }
  
  .revenue-models {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>