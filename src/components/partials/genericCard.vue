<template>
  <md-card md-with-hover>
    <md-ripple>
      <md-card-header>
        <div class="md-title">
        <md-icon v-if="department.type == 'department'">{{this.departmentLookup[department.name].icon}}</md-icon>
        {{department.name}}</div>
      </md-card-header>

      <md-card-content>
        {{renderDescription(department)}}
      </md-card-content>

      <md-button>
        View Department
      </md-button>
    </md-ripple>
  </md-card>
</template>

<script>
import departmentLookup from '@/components/departmentLookup.js'

export default {
  name: 'genericCard',
  props: {
    department: Object,
    click: Function,
  },
  data() {
    return {
      departmentLookup: false,
    }
  },
  methods: {
    renderDescription (item) {
      let description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet orci non velit aliquam rutrum. Nullam sollicitudin augue urna, nec dignissim diam molestie id.';
      if (item.type == 'department') {
        description = this.departmentLookup[item.name].description;;
      }
      if (item.description) {
        return item.description;
      }
      return description;
    }
  },
  mounted() {
    this.$el.addEventListener('click', ()=> {
      this.click(this.department);
    })
  },
  created() {
    this.departmentLookup = departmentLookup;
  },
  data() {
    return {
      initial: '',
      menuVisible: true,
    }
  }
}
</script>

<style lang="scss" scoped>

.md-card-header, .md-card-content {
  text-align: center;
}

.md-card-content {
  text-align: center !important;
}

.md-icon {
  font-size: 40px !important;
  margin-bottom: 20px;
  padding: 20px auto;
}

.md-icon {
  display: block;
}


</style>