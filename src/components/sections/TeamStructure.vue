<template>
  <div class="team-structure">
    <div class="section-header">
      <h3 class="section-title">
        <span class="title-icon">👥</span>
        初期团队配置与资源
      </h3>
      <p class="section-subtitle">
        为实现敏捷启动和低成本运营，初期核心团队配置为3人，最大化复用公司现有资源
      </p>
    </div>

    <!-- 3人核心团队 -->
    <div class="team-grid">
      <div class="team-member tech-lead">
        <div class="member-header">
          <div class="member-icon">🔧</div>
          <div class="member-info">
            <h4 class="member-title">产品与技术负责人</h4>
            <el-tag type="primary" size="small">1人</el-tag>
          </div>
        </div>
        
        <div class="member-responsibilities">
          <h5 class="responsibility-title">核心职责</h5>
          <ul class="responsibility-list">
            <li>
              <el-icon class="list-icon"><Star /></el-icon>
              <span>负责核心课程研发（通识课、广电课、"海看灵海"实战课）</span>
            </li>
            <li>
              <el-icon class="list-icon"><Star /></el-icon>
              <span>对接外部师资，建立"专家库"</span>
            </li>
            <li>
              <el-icon class="list-icon"><Star /></el-icon>
              <span>提供后期技术服务与咨询支持</span>
            </li>
          </ul>
          
          <div class="requirements">
            <h5 class="requirements-title">任职要求</h5>
            <p class="requirements-text">
              懂AI技术、懂业务场景、懂课程设计
            </p>
          </div>
        </div>
      </div>

      <div class="team-member business-lead">
        <div class="member-header">
          <div class="member-icon">💼</div>
          <div class="member-info">
            <h4 class="member-title">B端客户拓展负责人</h4>
            <el-tag type="success" size="small">1人</el-tag>
          </div>
        </div>
        
        <div class="member-responsibilities">
          <h5 class="responsibility-title">核心职责</h5>
          <ul class="responsibility-list">
            <li>
              <el-icon class="list-icon"><Star /></el-icon>
              <span>重点拓展大型企业、行业协会（如千帆咨询的服装行业）客户</span>
            </li>
            <li>
              <el-icon class="list-icon"><Star /></el-icon>
              <span>维护WayToAGI、东升成等B端合作伙伴关系</span>
            </li>
          </ul>
          
          <div class="requirements">
            <h5 class="requirements-title">任职要求</h5>
            <p class="requirements-text">
              具备大客户销售与商务拓展能力
            </p>
          </div>
        </div>
      </div>

      <div class="team-member government-lead">
        <div class="member-header">
          <div class="member-icon">🏛️</div>
          <div class="member-info">
            <h4 class="member-title">G端与渠道拓展负责人</h4>
            <el-tag type="warning" size="small">1人</el-tag>
          </div>
        </div>
        
        <div class="member-responsibilities">
          <h5 class="responsibility-title">核心职责</h5>
          <ul class="responsibility-list">
            <li>
              <el-icon class="list-icon"><Star /></el-icon>
              <span>重点攻坚G端客户（政府、教育厅、人社厅等）</span>
            </li>
            <li>
              <el-icon class="list-icon"><Star /></el-icon>
              <span>核心任务是维护与拓展全省广电系统渠道</span>
            </li>
            <li>
              <el-icon class="list-icon"><Star /></el-icon>
              <span>推动"AI培训产品包"在16地市落地</span>
            </li>
          </ul>
          
          <div class="requirements">
            <h5 class="requirements-title">任职要求</h5>
            <p class="requirements-text">
              熟悉政府项目运作，具备强大的渠道管理能力
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 复用资源说明 -->
    <div class="shared-resources">
      <div class="resources-header">
        <h4 class="resources-title">
          <span class="title-icon">🏢</span>
          复用资源
        </h4>
      </div>
      
      <div class="resources-content">
        <div class="resources-note">
          <div class="note-icon">ℹ️</div>
          <div class="note-text">
            团队行政、财务、法务、市场宣传等职能，初期全面依赖公司现有中后台支持，
            最大化控制人力成本，确保业务轻装上阵，快速启动。
          </div>
        </div>
        
        <div class="resource-categories">
          <div class="category">
            <div class="category-icon">📊</div>
            <div class="category-title">行政支持</div>
            <p class="category-desc">公司行政团队全面支持日常运营</p>
          </div>
          
          <div class="category">
            <div class="category-icon">💰</div>
            <div class="category-title">财务管理</div>
            <p class="category-desc">现有财务体系处理项目资金和账务</p>
          </div>
          
          <div class="category">
            <div class="category-icon">⚖️</div>
            <div class="category-title">法务合规</div>
            <p class="category-desc">公司法务团队提供合同审核和法律支持</p>
          </div>
          
          <div class="category">
            <div class="category-icon">📢</div>
            <div class="category-title">市场宣传</div>
            <p class="category-desc">利用现有宣传渠道和品牌影响力</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 团队优势 -->
    <div class="team-advantages">
      <div class="advantages-header">
        <h4 class="advantages-title">
          <span class="title-icon">✨</span>
          团队配置优势
        </h4>
      </div>
      
      <div class="advantages-list">
        <div class="advantage-item">
          <div class="advantage-icon">🚀</div>
          <div class="advantage-content">
            <h5 class="advantage-title">敏捷启动</h5>
            <p class="advantage-desc">小团队快速决策，快速响应市场变化</p>
          </div>
        </div>
        
        <div class="advantage-item">
          <div class="advantage-icon">💰</div>
          <div class="advantage-content">
            <h5 class="advantage-title">成本控制</h5>
            <p class="advantage-desc">最大化复用资源，显著降低运营成本</p>
          </div>
        </div>
        
        <div class="advantage-item">
          <div class="advantage-icon">🎯</div>
          <div class="advantage-content">
            <h5 class="advantage-title">专业互补</h5>
            <p class="advantage-desc">技术、市场、政府三方面专业能力互补</p>
          </div>
        </div>
        
        <div class="advantage-item">
          <div class="advantage-icon">🔄</div>
          <div class="advantage-content">
            <h5 class="advantage-title">灵活扩展</h5>
            <p class="advantage-desc">随着业务发展可灵活扩展团队规模</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Star } from '@element-plus/icons-vue'

export default {
  name: 'TeamStructure',
  components: {
    Star
  }
}
</script>

<style scoped>
.team-structure {
  margin: 32px 0;
  padding: 32px;
  background: #f8fafc;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
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

/* 团队成员卡片 */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.team-member {
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.team-member:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.tech-lead {
  border-top: 4px solid #3b82f6;
}

.business-lead {
  border-top: 4px solid #10b981;
}

.government-lead {
  border-top: 4px solid #f59e0b;
}

.member-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f3f4f6;
}

.member-icon {
  font-size: 40px;
  flex-shrink: 0;
}

.member-info {
  flex: 1;
}

.member-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.member-responsibilities {
  color: #4b5563;
}

.responsibility-title {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.responsibility-title::before {
  content: "📋";
  font-size: 18px;
}

.responsibility-list {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.responsibility-list li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 14px;
  line-height: 1.5;
  padding: 8px;
  background: #f9fafb;
  border-radius: 6px;
}

.list-icon {
  color: #3b82f6;
  font-size: 16px;
  margin-top: 2px;
  flex-shrink: 0;
}

.requirements {
  background: #eff6ff;
  border-radius: 8px;
  padding: 16px;
  border-left: 4px solid #3b82f6;
}

.requirements-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e40af;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.requirements-title::before {
  content: "🎯";
  font-size: 16px;
}

.requirements-text {
  color: #3730a3;
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
}

/* 复用资源 */
.shared-resources {
  background: white;
  border-radius: 12px;
  padding: 32px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 32px;
}

.resources-header {
  text-align: center;
  margin-bottom: 24px;
}

.resources-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.resources-note {
  background: #fef3c7;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  border-left: 4px solid #f59e0b;
}

.note-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.note-text {
  color: #92400e;
  line-height: 1.6;
  font-size: 14px;
  margin: 0;
}

.resource-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.category {
  background: #f9fafb;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.category:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.category-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.category-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.category-desc {
  color: #6b7280;
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
}

/* 团队优势 */
.team-advantages {
  background: white;
  border-radius: 12px;
  padding: 32px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.advantages-header {
  text-align: center;
  margin-bottom: 32px;
}

.advantages-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.advantages-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.advantage-item {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.advantage-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.advantage-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.advantage-content {
  flex: 1;
}

.advantage-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.advantage-desc {
  color: #6b7280;
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .team-structure {
    padding: 20px;
    margin: 24px 0;
  }
  
  .team-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .resource-categories {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
  }
  
  .advantages-list {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .advantage-item {
    flex-direction: column;
    text-align: center;
  }
}
</style>