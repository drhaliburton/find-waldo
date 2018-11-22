<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <img class="yukon-logo" src="https://yukon.ca/sites/yukon.ca/themes/yukon_wxt/logo-white.svg"></img>
        <span class="md-title">Find a Government Employee</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
        <md-toolbar class="md-transparent" md-elevation="0">
          <md-button class="md-icon-button md-dense" @click="toggleMenu">
            <md-icon>chevron_left</md-icon>
          </md-button>
        </md-toolbar>

        <md-list>
          <div v-for="(department, index) in departments" :key="index" @click="goToRoute(department, index)">
            <md-list-item class='foo-block'>
            <md-icon>{{renderIcon(department)}}</md-icon>
              {{department.name}}
            </md-list-item>
          </div>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <slot></slot>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  export default {
  name: 'appFrame',
  props: ['content', 'formatRoute'],
  data() {
    return {
      initial: '',
      menuVisible: true,
      departmentLookup: {
        "Highways and Public Works": {
          icon: 'commute',
          description: 'The Department of Highways and Public Works is responsible for ensuring safe and efficient public highways, airstrips, buildings and information systems.'
        },
        "Cabinet Office": {
          icon: 'account_balance',
          description: 'The Yukon government caucus members make up the Premier\'s team'
        },
        "Child and Youth Advocate Office": {
          icon: 'face',
          description: 'The Advocate Office provides services to Yukon\'s children and youth by protecting and implementing their rights and ensuring their voices are heard within a safe environment.'
        },
        "Commissioners Office": {
          icon: 'line_weight',
          description: 'The Commissioner is appointed by the Government of Canada to a role very similar to a provincial lieutenant governor. The Commissioner is Yukon\'s head of state and generally acts on the advice of elected officials. She is an important figure in the legislature and the Government of Yukon.'
        },
        "Community Services": {
          icon: 'business',
          description: 'Social and community service workers administer and implement a variety of social assistance programs and community services, and assist clients to deal with personal and social problems.'
        },
        "Economic Development": {
          icon: 'store_mall_directory',
          description: 'The Department of Economic Development offers a variety of programs and funds for business, industry and communities to help develop and maintain a sustainable and competitive Yukon economy.'
        },
        "Education": {
          icon: 'school',
          description: 'The Department of Education offers supports for lifelong learning and supports for labour market projections.'
        },
        "Elections Yukon": {
          icon: 'how_to_vote',
          description: 'Elections in Yukon are conducted by an independent Office of the Legislative Assembly, under the direction of the Chief Electoral Officer. This ensures that elections are conducted in a fair and unbiased manner. Elections Yukon conducts territorial elections of Members of the Legislative Assembly, in accordance with the Elections Act. The office also conducts school council and school board elections, in accordance with the Education Act.'
        },
        "Energy Mines and Resources": {
          icon: 'highlight',
          description: 'From lab analysis to land appraisers, snowmobiles to road construction, Energy, Mines and Resources purchases a wide range of goods and services.'
        },
        "Environment": {
          icon: 'terrain',
          description: 'Environment Yukon takes a leading role in\: regulating and enforcing safe standards for air, water, and soil, managing human impacts on fish and wildlife, providing quality outdoor recreation opportunities in territorial parks and campgrounds, and in addressing the challenge of global climate change.'
        },
        "Executive Council Office": {
          icon: 'person_pin',
          description: 'Intergovernmental Relations works to ensure Yukon’s success in achieving its priorities that require intergovernmental engagement and cooperation. Yukon\'s priorities are advanced through intergovernmental forums and bilateral and multilateral partnerships with the federal government, other provinces and territories, and international jurisdictions.'
        },
        "Finance": {
          icon: 'monetization_on',
          description: 'Delivering timely, efficient, reliable ongoing services including bill payment, cash receipts, payroll administration, cash management, financial forecasting, budget preparation, and financial reporting.'
        },
        "French Language Services Directorate": {
          icon: 'language',
          description: 'The mandate of  the French Language Services Directorate (FLSD) is to support Yukon government’s departments and corporations in meeting the requirements of the Languages Act.'
        },
        "Health and Social Services": {
          icon: 'local_hospital',
          description: 'To promote, protect, and enhance the well-being of Yukon people through a continuum of quality, accessible, and appropriate health and social services.'
        },
        "Justice": {
          icon: 'gavel',
          description: 'Healthy relationships, peaceful communities: Our justice system, legislation, and the work we do to build harmonious relationships are the foundation for safe, healthy and peaceful communities.'
        },
        "Legislative Assembly Office": {
          icon: 'keyboard',
          description: 'The Yukon Legislative Assembly is the legislative assembly for Yukon, Canada. The Yukon Legislative Assembly is the only legislature in Canada\'s three federal territories which is organized along political party lines.'
        },
        "Ombudsman / Information and Privacy Commissioner": {
          icon: 'perm_scan_wifi',
          description: 'The Ombudsman promotes and protects fairness in the delivery of government and other public services. If you are a citizen and have been treated unfairly when engaging these services, we will work to resolve the unfairness. The Ombudsman also works proactively with Authorities to assist them in delivering services more fairly.'
        },
        "Public Service Commission": {
          icon: 'perm_scan_wifi',
          description: 'Public Service Commission is responsible for the Yukon Government workforce as it relates to recruitment, classification of positions, employee compensation, human resource policy, labour relations (including negotiating collective agreements), human resource data, creating a respectful workplace, employee health and safety, inclusion and diversity, training and development of employees, employee engagement, and corporate internal communications'
        },
        "Public Service Commission": {
          icon: 'pan_tool',
          description: 'Public Service Commission is responsible for the Yukon Government workforce as it relates to recruitment, classification of positions, employee compensation, human resource policy, labour relations (including negotiating collective agreements), human resource data, creating a respectful workplace, employee health and safety, inclusion and diversity, training and development of employees, employee engagement, and corporate internal communications'
        },
        "Tourism and Culture": {
          icon: 'local_see',
          description: 'The “Larger than Life” brand reflects the warmth and beauty of Yukon’s people, landscapes, culture and history building excitement that cultivates a desire to travel to Yukon and enjoy high-quality, authentic tourism experiences.'
        },
        "Women's Directorate": {
          icon: 'wc',
          description: 'The Women’s Directorate is a Yukon government department that advances the social, legal, and economic equality of Yukon citizens.'
        },
        "Yukon Development Corporation": {
          icon: 'build',
          description: 'Yukon Development Corporation (YDC) is a crown corporation created in 1986 by the Yukon Development Corporation Act. It is governed by a Board of Directors appointed by the Yukon government and is the sole shareholder of Yukon Energy Corporation.'
        },
        "Yukon Environmental and Socioeconomic Assessment Board": {
          icon: 'local_drink',
          description: 'The Yukon Environmental and Socio-economic Assessment Board’s mission is to protect the environmental and social integrity of Yukon, while fostering responsible development in the territory that reflects the values of Yukoners and respects the contributions of First Nations.'
        },
        "Yukon Hospital Corporation": {
          icon: 'local_convenience_store',
          description: 'A journey together. The best care every time.  Health care is an important, very personal and unique experience for each of us. It is a journey that involves the patient, first and foremost, along with collaborative health care teams within our hospital system and Yukon communities.'
        },
        "Yukon Housing Corporation": {
          icon: 'home',
          description: 'YHC provides affordable social housing units to low income individuals and families throughout Yukon. YHC also administers the Government of Yukon’s rural staff housing program where YHC owns housing units which are rented to Yukon government employees in rural communities.'
        },
        "Yukon Liquor Commission": {
          icon: 'local_bar',
          description: 'The Yukon Liquor Corporation regulates the distribution, purchase and sale of alcoholic beverages in the Canadian territory of Yukon. The Corporation came into existence in 1977 as a result of amendments to the Liquor Act. It currently operates six liquor stores and a central facility in Whitehorse.'
        },
        "Yukon Liquor Corporation": {
          icon: 'local_bar',
          description: 'The Yukon Liquor Corporation regulates the distribution, purchase and sale of alcoholic beverages in the Canadian territory of Yukon. The Corporation came into existence in 1977 as a result of amendments to the Liquor Act. It currently operates six liquor stores and a central facility in Whitehorse.'
        },
        "Yukon Lottery Commission": {
          icon: 'local_bar',
          description: 'The Yukon Liquor Corporation regulates the distribution, purchase and sale of alcoholic beverages in the Canadian territory of Yukon. The Corporation came into existence in 1977 as a result of amendments to the Liquor Act. It currently operates six liquor stores and a central facility in Whitehorse.'
        },
        "Yukon Lottery Corporation": {
          icon: 'local_bar',
          description: 'The Yukon Liquor Corporation regulates the distribution, purchase and sale of alcoholic beverages in the Canadian territory of Yukon. The Corporation came into existence in 1977 as a result of amendments to the Liquor Act. It currently operates six liquor stores and a central facility in Whitehorse.'
        },
        "Yukon Workers Compensation Health": {
          icon: 'group',
          description: 'The Yukon Workers\' Compensation Health and Safety Board is funded solely by Yukon employers. Our job is preventing disability. We do that by providing compensation, service and support to Yukon workers injured on the job.'
        },
        "Yukon Workers Compensation Health and Safety Board": {
          icon: 'group',
          description: 'The Yukon Workers\' Compensation Health and Safety Board is funded solely by Yukon employers. Our job is preventing disability. We do that by providing compensation, service and support to Yukon workers injured on the job.'
        }
      }
    }
  },
  methods: {
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    },
    renderIcon (item) {
      let icon = 'home';
      if (item.name) {
        icon = this.departmentLookup[item.name].icon;
      }
      return icon;
    },
    goToRoute(department, index) {
      let path = '/';
      let reload = false;
      if (department.children) {
        path = path + 'departments/'+ index;
      } else {
        path = path + 'departments/'+ index + '/employees';
        reload = true;
      }
      this.$router.push(path);
      // if (reload) {
      //   Location.reload()
      // }
    },
  },
  computed: {
    departments() {
      return this.$store.state.departments;
    }
  },
  created() {
    if (!this.$store.state.departments) {
      this.$store.dispatch('getContent');
    }
  }
}
</script>

<style lang="scss" scoped>
  .md-app {
    min-height: 350px;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    max-width: 300px;
  }

  .md-toolbar.md-theme-default.md-transparent {
    padding-top: 13px;
  }

  input {
    caret-color: black !important;
  }

  .md-app {
    border: 1px solid rgba(#000, .12);
  }

  .md-content {
   background-color: #fafafa;
  }

.md-drawer.md-persistent-mini.md-left {
 border-left: 1px solid lightgrey !important;
}
.md-drawer.md-persistent-mini:not(.md-active) {
  width: 60px !important;
  .md-list-item-content {
  padding: 0 !important;
}
}

.md-list-item-content>.md-icon:first-child {
  margin-right: 17px;
}

.md-list-item-content:hover {
  cursor:pointer;
}

.md-toolbar {
  position: sticky;
  z-index: 999;
}

@media only screen and (max-width: 1050px) {
  .md-button {
    display: none;
  }
}


</style>