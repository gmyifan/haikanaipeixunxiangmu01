<template>
  <div class="strategy-view">
    <div class="page-header">
      <h1 class="page-title">
        <span class="title-icon">🎯</span>
        战略定位
      </h1>
      <p class="page-subtitle">以AI培训为起点，构建AI业务生态</p>
    </div>

    <div class="content-sections">
      <!-- 核心价值主张 -->
      <section class="value-proposition">
        <h2>核心价值主张</h2>
        <div class="value-cards">
          <div class="value-card">
            <div class="card-icon">💎</div>
            <h3>价值锚点</h3>
            <p>可持续的商业模式不是交付易朽的工具，而是成为企业转型的"陪跑者"</p>
          </div>
          <div class="value-card">
            <div class="card-icon">🤝</div>
            <h3>服务理念</h3>
            <p>提供"咨询 + 培训"服务，培养具备AI能力的人才</p>
          </div>
          <div class="value-card">
            <div class="card-icon">🔄</div>
            <h3>模式转变</h3>
            <p>从一次性产品买卖转变为长期的能力建设伙伴关系</p>
          </div>
        </div>
      </section>

      <!-- 发展路径 -->
      <section class="development-path">
        <h2>发展路径</h2>
        <div class="path-timeline">
          <div class="path-item">
            <div class="path-icon">培训</div>
            <div class="path-content">
              <h3>建立信任</h3>
              <p>通过AI培训建立客户信任</p>
            </div>
          </div>
          <div class="path-arrow">→</div>
          <div class="path-item">
            <div class="path-icon">咨询</div>
            <div class="path-content">
              <h3>深度服务</h3>
              <p>提供专业的咨询服务</p>
            </div>
          </div>
          <div class="path-arrow">→</div>
          <div class="path-item">
            <div class="path-icon">解决方案</div>
            <div class="path-content">
              <h3>产品化</h3>
              <p>将服务标准化产品化</p>
            </div>
          </div>
          <div class="path-arrow">→</div>
          <div class="path-item">
            <div class="path-icon">平台服务</div>
            <div class="path-content">
              <h3>生态化</h3>
              <p>构建完整的AI业务生态</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 战略要点 -->
      <section class="key-points">
        <h2>战略要点</h2>
        <div class="points-grid">
          <div class="point-item">
            <div class="point-number">01</div>
            <div class="point-content">
              <h3>AI时代的认知鸿沟</h3>
              <p>最大的鸿沟不是技术，而是认知。我们不卖课程，我们提供'解决问题的方案'</p>
            </div>
          </div>
          <div class="point-item">
            <div class="point-number">02</div>
            <div class="point-content">
              <h3>战略起点而非终点</h3>
              <p>AI培训业务不是海看的终点，而是海看人工智能业务的战略起点和重要切入点</p>
            </div>
          </div>
          <div class="point-item">
            <div class="point-number">03</div>
            <div class="point-content">
              <h3>人才基础设施</h3>
              <p>通过培训建立客户信任、洞察市场需求，是海看构建"人才基础设施"的第一步</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 行动建议 -->
      <section class="action-recommendations">
        <h2>行动建议</h2>
        <div class="action-cards">
          <div class="action-card primary">
            <div class="action-icon">🚀</div>
            <h3>立即行动</h3>
            <p>抓住当前政策红利和市场需求的"黄金窗口期"</p>
            <el-button type="primary" @click="goToNext('why')">查看市场机遇</el-button>
          </div>
          <div class="action-card secondary">
            <div class="action-icon">📊</div>
            <h3>深入了解</h3>
            <p>详细了解WHY、WHAT、HOW各板块内容</p>
            <el-button @click="viewFullContent">查看完整内容</el-button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

export default {
  name: 'Strategy',
  setup() {
    const router = useRouter()
    const appStore = useAppStore()

    const goToNext = (section) => {
      router.push(`/${section}`)
    }

    const viewFullContent = () => {
      router.push('/full-content')
    }

    onMounted(() => {
      appStore.setCurrentSection('strategy')
    })

    return {
      goToNext,
      viewFullContent
    }
  }
}
</script>

<style scoped>
.strategy-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 60px;
}

.page-title {
  font-size: 48px;
  font-weight: 700;
  color: #1e3a8a;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.title-icon {
  font-size: 42px;
}

.page-subtitle {
  font-size: 20px;
  color: #6b7280;
  margin: 0;
}

.content-sections {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.content-sections h2 {
  font-size: 32px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 32px 0;
  text-align: center;
}

/* 价值主张卡片 */
.value-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

.value-card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.value-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: #1e3a8a;
}

.value-card .card-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.value-card h3 {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 16px 0;
}

.value-card p {
  font-size: 16px;
  line-height: 1.6;
  color: #6b7280;
  margin: 0;
}

/* 发展路径 */
.path-timeline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.path-item {
  background: white;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  border: 2px solid #1e3a8a;
  flex: 1;
  min-width: 160px;
}

.path-icon {
  font-size: 32px;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 16px;
}

.path-content h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.path-content p {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.path-arrow {
  font-size: 24px;
  color: #1e3a8a;
  font-weight: 700;
}

/* 战略要点 */
.points-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

.point-item {
  display: flex;
  gap: 20px;
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e5e7eb;
}

.point-number {
  font-size: 32px;
  font-weight: 700;
  color: #1e3a8a;
  line-height: 1;
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border-radius: 8px;
}

.point-content h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px 0;
}

.point-content p {
  font-size: 15px;
  line-height: 1.6;
  color: #6b7280;
  margin: 0;
}

/* 行动建议 */
.action-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

.action-card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
}

.action-card.primary {
  border-color: #1e3a8a;
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  color: white;
}

.action-card.secondary {
  border-color: #6b7280;
}

.action-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.action-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.action-card h3 {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 16px 0;
}

.action-card p {
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 24px 0;
}

.action-card.primary p,
.action-card.primary h3 {
  color: white;
}

.action-card.secondary p,
.action-card.secondary h3 {
  color: #374151;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .strategy-view {
    padding: 20px 16px;
  }
  
  .page-title {
    font-size: 32px;
  }
  
  .page-subtitle {
    font-size: 18px;
  }
  
  .content-sections h2 {
    font-size: 24px;
    margin-bottom: 24px;
  }
  
  .path-timeline {
    flex-direction: column;
    align-items: stretch;
  }
  
  .path-arrow {
    transform: rotate(90deg);
    margin: 8px 0;
  }
  
  .point-item {
    flex-direction: column;
    text-align: center;
  }
}
</style>