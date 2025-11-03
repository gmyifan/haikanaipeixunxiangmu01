<template>
  <div class="what-view">
    <!-- 页面标题 -->
    <section class="page-header">
      <div class="header-content">
        <h1 class="page-title">
          <span class="title-icon">🎯</span>
          WHAT：做什么？
        </h1>
        <p class="page-subtitle">
          海看AI培训的核心定位、业务架构与生态合作
        </p>
        <p class="page-description">
          以"培训+"为核心，构建"培训+咨询+工具+平台"的AI业务生态体系，成为山东省AI人才基础设施的核心承载者
        </p>
        <div class="page-meta">
          <span class="line-info">{{ lineRange[0] }}-{{ lineRange[1] }}行</span>
          <span class="reading-time">约{{ readingTime }}分钟阅读</span>
        </div>
      </div>
    </section>

    <!-- 核心定位 -->
    <section class="positioning-section">
      <h2 class="section-title">
        <span class="title-icon">🎯</span>
        核心定位：以"培训+"为业务核心
      </h2>
      
      <div class="positioning-grid">
        <div class="positioning-card core">
          <div class="card-header">
            <div class="card-icon">🎯</div>
            <h3>核心：培训</h3>
          </div>
          <div class="card-content">
            <p>AI技能培训、认知提升、实战训练</p>
            <div class="highlight-text">这是我们的立身之本和流量入口</div>
          </div>
        </div>

        <div class="positioning-card consulting">
          <div class="card-header">
            <div class="card-icon">💡</div>
            <h3>增值：咨询</h3>
          </div>
          <div class="card-content">
            <p>AI转型咨询、解决方案设计、落地指导</p>
            <div class="highlight-text">基于培训需求延伸的咨询服务</div>
          </div>
        </div>

        <div class="positioning-card tools">
          <div class="card-header">
            <div class="card-icon">🛠️</div>
            <h3>支撑：工具</h3>
          </div>
          <div class="card-content">
            <p>AIGC工具、智能搜索、行业应用工具</p>
            <div class="highlight-text">提供技术工具支撑培训效果</div>
          </div>
        </div>

        <div class="positioning-card platform">
          <div class="card-header">
            <div class="card-icon">🌐</div>
            <h3>平台：生态</h3>
          </div>
          <div class="card-content">
            <p>线上学习平台、社群运营、生态构建</p>
            <div class="highlight-text">长期价值变现的生态平台</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 业务架构 -->
    <section class="architecture-section">
      <h2 class="section-title">
        <span class="title-icon">🏗️</span>
        业务架构："12345"战略架构
      </h2>
      
      <div class="architecture-overview">
        <div class="architecture-center">
          <div class="center-icon">🎯</div>
          <div class="center-text">AI培训业务</div>
        </div>
        
        <div class="architecture-rings">
          <div class="ring-outer">
            <div class="ring-item">
              <span class="ring-number">1</span>
              <span class="ring-text">一个核心业务</span>
            </div>
            <div class="ring-item">
              <span class="ring-number">2</span>
              <span class="ring-text">两个目标市场</span>
            </div>
            <div class="ring-item">
              <span class="ring-number">3</span>
              <span class="ring-text">三类产品体系</span>
            </div>
            <div class="ring-item">
              <span class="ring-number">4</span>
              <span class="ring-text">四种盈利模式</span>
            </div>
            <div class="ring-item">
              <span class="ring-number">5</span>
              <span class="ring-text">五个发展阶段</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 产品体系 -->
    <section class="products-section">
      <h2 class="section-title">
        <span class="title-icon">📦</span>
        三类产品体系
      </h2>
      
      <div class="products-grid">
        <div class="product-category">
          <div class="category-header">
            <div class="category-icon">🎓</div>
            <h3>培训产品</h3>
          </div>
          <div class="category-content">
            <ul class="product-list">
              <li>G端：政府AI素养提升</li>
              <li>B端：企业AI转型培训</li>
              <li>S端：社会AI技能认证</li>
            </ul>
          </div>
        </div>

        <div class="product-category">
          <div class="category-header">
            <div class="category-icon">💡</div>
            <h3>咨询产品</h3>
          </div>
          <div class="category-content">
            <ul class="product-list">
              <li>AI战略规划咨询</li>
              <li>技术选型与实施</li>
              <li>组织变革管理</li>
            </ul>
          </div>
        </div>

        <div class="product-category">
          <div class="category-header">
            <div class="category-icon">🛠️</div>
            <h3>工具产品</h3>
          </div>
          <div class="category-content">
            <ul class="product-list">
              <li>AIGC内容创作平台</li>
              <li>智能搜索与知识库</li>
              <li>行业AI应用工具</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 生态合作表格 -->
    <section class="partnership-section">
      <h2 class="section-title">
        <span class="title-icon">🤝</span>
        生态合作矩阵
      </h2>
      
      <PartnershipTable />
    </section>

  
    <!-- 快速导航 -->
    <section class="navigation-section">
      <div class="nav-buttons">
        <button class="nav-btn prev-btn" @click="goToPrev">
          <span class="btn-icon">←</span>
          <span class="btn-text">为什么做</span>
        </button>
        <button class="nav-btn home-btn" @click="goHome">
          <span class="btn-icon">🏠</span>
          <span class="btn-text">首页</span>
        </button>
        <button class="nav-btn next-btn" @click="goToNext">
          <span class="btn-text">如何做</span>
          <span class="btn-icon">→</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import PartnershipTable from '@/components/tables/PartnershipTable.vue'

export default {
  name: 'What',
  components: {
    PartnershipTable
  },
  setup() {
    const router = useRouter()
    const appStore = useAppStore()
    
    // 页面数据
    const lineRange = [31, 73] // 对应稿件.md行数（移除盈利模式部分）
    const readingTime = 6 // 预估阅读时间
    
    // 导航方法
    const goToPrev = () => {
      router.push('/why')
    }
    
    const goHome = () => {
      router.push('/')
    }
    
    const goToNext = () => {
      router.push('/how')
    }
    
    // 页面初始化
    onMounted(() => {
      appStore.setCurrentSection('what')
      // 更新阅读进度
      appStore.updateReadingProgress(lineRange[0], lineRange[1])
    })
    
    return {
      lineRange,
      readingTime,
      goToPrev,
      goHome,
      goToNext
    }
  }
}
</script>

<style scoped>
.what-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* 页面标题 */
.page-header {
  text-align: center;
  margin-bottom: 48px;
  padding: 48px 0;
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
  border-radius: 16px;
  color: white;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 32px;
}

.page-title {
  font-size: 42px;
  font-weight: 700;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.title-icon {
  font-size: 38px;
}

.page-subtitle {
  font-size: 20px;
  font-weight: 500;
  margin: 0 0 16px 0;
  opacity: 0.9;
}

.page-description {
  font-size: 16px;
  margin: 0 0 24px 0;
  opacity: 0.8;
  line-height: 1.6;
}

.page-meta {
  display: flex;
  justify-content: center;
  gap: 24px;
  font-size: 14px;
  opacity: 0.8;
}

.line-info,
.reading-time {
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

/* 区域标题 */
.section-title {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 32px 0;
  display: flex;
  align-items: center;
  gap: 16px;
  text-align: center;
  justify-content: center;
}

/* 核心定位区域 */
.positioning-section {
  margin-bottom: 48px;
}

.positioning-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.positioning-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.positioning-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.positioning-card.core {
  border-color: #7c3aed;
}

.positioning-card.consulting {
  border-color: #3b82f6;
}

.positioning-card.tools {
  border-color: #10b981;
}

.positioning-card.platform {
  border-color: #f59e0b;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 24px;
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
}

.card-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.core .card-icon {
  color: #7c3aed;
}

.consulting .card-icon {
  color: #3b82f6;
}

.tools .card-icon {
  color: #10b981;
}

.platform .card-icon {
  color: #f59e0b;
}

.card-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
}

.card-content {
  padding: 24px;
}

.card-content p {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #374151;
  line-height: 1.6;
}

.highlight-text {
  font-size: 14px;
  font-weight: 500;
  padding: 8px 12px;
  background: #f0f9ff;
  border-radius: 8px;
  color: #1e40af;
  text-align: center;
}

/* 业务架构区域 */
.architecture-section {
  margin-bottom: 48px;
}

.architecture-overview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  padding: 48px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 16px;
  border: 1px solid #e2e8f0;
}

.architecture-center {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: 0 12px 24px rgba(124, 58, 237, 0.3);
}

.center-icon {
  font-size: 48px;
}

.center-text {
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}

.architecture-rings {
  display: flex;
  justify-content: center;
  align-items: center;
}

.ring-outer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  max-width: 500px;
}

.ring-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  min-width: 120px;
  text-align: center;
  transition: all 0.3s ease;
}

.ring-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.ring-number {
  font-size: 24px;
  font-weight: 700;
  color: #7c3aed;
}

.ring-text {
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}

/* 产品体系区域 */
.products-section {
  margin-bottom: 48px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.product-category {
  background: white;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.product-category:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f1f5f9;
}

.category-icon {
  font-size: 40px;
  flex-shrink: 0;
}

.category-header h3 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
}

.product-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.product-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 8px;
  font-size: 16px;
  color: #374151;
  transition: all 0.2s ease;
}

.product-list li:hover {
  background: #e2e8f0;
  transform: translateX(4px);
}

.product-list li::before {
  content: '📦';
  font-size: 18px;
}

/* 合作伙伴和盈利模式区域 */
.partnership-section,
.revenue-section,
.detailed-revenue-section,
.team-section,
.execution-section {
  margin-bottom: 48px;
}

/* 导航按钮 */
.navigation-section {
  margin-top: 48px;
}

.nav-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.prev-btn {
  background: #f3f4f6;
  color: #374151;
}

.prev-btn:hover {
  background: #e5e7eb;
}

.home-btn {
  background: #1e3a8a;
  color: white;
}

.home-btn:hover {
  background: #1e40af;
}

.next-btn {
  background: #7c3aed;
  color: white;
}

.next-btn:hover {
  background: #6d28d9;
}

.btn-icon {
  font-size: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .what-view {
    padding: 20px 16px;
  }
  
  .page-header {
    padding: 32px 24px;
    margin-bottom: 32px;
  }
  
  .header-content {
    padding: 0 16px;
  }
  
  .page-title {
    font-size: 32px;
  }
  
  .page-subtitle {
    font-size: 18px;
  }
  
  .page-meta {
    flex-direction: column;
    gap: 12px;
  }
  
  .positioning-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .architecture-overview {
    padding: 32px 24px;
    gap: 32px;
  }
  
  .architecture-center {
    width: 160px;
    height: 160px;
  }
  
  .center-icon {
    font-size: 36px;
  }
  
  .center-text {
    font-size: 16px;
  }
  
  .ring-outer {
    gap: 12px;
  }
  
  .ring-item {
    min-width: 100px;
    padding: 16px 12px;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .product-category {
    padding: 24px;
  }
  
  .category-header {
    gap: 12px;
    margin-bottom: 20px;
  }
  
  .category-icon {
    font-size: 32px;
  }
  
  .nav-buttons {
    flex-direction: column;
    width: 100%;
  }
  
  .nav-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>