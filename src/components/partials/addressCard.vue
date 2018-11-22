<template>
<md-card>
    <md-card-header>
      <md-card-header-text>
        <div class="md-title">
          <b>{{employee.department}}</b> - {{employee.office}}</div>
        <div class="md-subhead">
          {{employee.address}}, <span v-if="employee.suite">{{employee.suite}}</span><br>
          {{employee.community}}, {{employee.postal_code}}<br>
          PO {{employee.po_box}}<br>
          <div>Mailcode: {{employee.mailcode}}</div>
        </div>
      </md-card-header-text>
    </md-card-header>

    <md-card-content :class="{'hide-content': !hasMap}">
      <div id="mapid"></div>
    </md-card-content>


    <md-card-actions md-alignment="left">
      <md-button :href="mapsDirections" target="_blank">
        <md-icon>directions</md-icon>
        Directions
      </md-button>
      <md-button :href="mapsPath" target="_blank">
        <md-icon>place</md-icon>
        Map
      </md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
import map from 'leaflet';

export default {
  name: 'addressCard',
  props: {
    employee: Object
  },
  data() {
    return {
    location_samples: [
        {"ObjectId":"3730","organization":"","department":"Highways and Public Works","division":"Transportation","branch":"Aviation","unit":"Safety and Security","suite":"","office":"Whitehorse Airport Terminal","address":"","community":"Whitehorse","latitude":"60.72085","longitude":"-135.05323","mailcode":"W16"},
        {"ObjectId":"4497","organization":"","department":"Justice","division":"Community Justice and Public Safety","branch":"Corrections","unit":"Whitehorse Corrections Centre","suite":"","office":"Whitehorse Correctional Centre","address":"25 College Drive","community":"Whitehorse","latitude":"60.74384581","longitude":"-135.0953155","mailcode":"J4"},
        {"ObjectId":"788","organization":"","department":"Health and Social Services","division":"Health Services","branch":"Community Health Programs","unit":"","suite":"","office":"4 Hospital Road","address":"4 Hospital Road","community":"Whitehorse","latitude":"60.718653","longitude":"-135.0440002","mailcode":"4Hosp"},
        {"ObjectId":"2992","organization":"","department":"Education","division":"Public Schools","branch":"Schools","unit":"Whitehorse Schools","suite":"15","office":"Gadzoosdaa Student Residence","address":"Selkirk Street","community":"Whitehorse","latitude":"60.70550765","longitude":"-135.0405982","mailcode":"GAD"},
        {"ObjectId":"1693","organization":"","department":"Health and Social Services","division":"","branch":"","unit":"","suite":"","office":"","address":"","community":"Whitehorse","latitude":"60.72085","longitude":"-135.05323","mailcode":""},
        {"ObjectId":"3260","organization":"","department":"Highways and Public Works","division":"Transportation","branch":"Transportation Maintenance","unit":"Northern Area","suite":"","office":"Old Crow","address":"Box 2703, W-12","community":"Whitehorse","latitude":"60.72085","longitude":"-135.05323","mailcode":""},
        {"ObjectId":"1230","organization":"","department":"Health and Social Services","division":"Social Services","branch":"Family and Children's Services","unit":"Child Care Services","suite":"","office":"9010","address":"9010 Quartz Road","community":"Whitehorse","latitude":"60.73198082","longitude":"-135.0670439","mailcode":"H12"},
        {"ObjectId":"659","organization":"","department":"Education","division":"Public Schools","branch":"Schools","unit":"Rural Schools","suite":"","office":"Watson Lake Secondary School","address":"","community":"Watson Lake","latitude":"60.06293","longitude":"-128.71524","mailcode":"WLS"},
        {"ObjectId":"4547","organization":"","department":"Yukon Workers Compensation Health and Safety Board","division":"Operations ","branch":"Financial Services ","unit":"","suite":"","office":"WCB Building","address":"401 Strickland Street","community":"Whitehorse","latitude":"60.72188865","longitude":"-135.0592165","mailcode":"WCHSB"},
        {"ObjectId":"1746","organization":"","department":"Health and Social Services","division":"","branch":"","unit":"","suite":"","office":"","address":"","community":"Whitehorse","latitude":"60.72085","longitude":"-135.05323","mailcode":""},
        {"ObjectId":"4030","organization":"","department":"Highways and Public Works","division":"Transportation","branch":"Transportation Maintenance","unit":"Mechanical Operations","suite":"275","office":"Transportation Maintenance and Sign Shop","address":"9029 Quartz Road","community":"Whitehorse","latitude":"60.73609667","longitude":"-135.0720893","mailcode":"W12"},
        {"ObjectId":"32","organization":"","department":"Community Services","division":"","branch":"","unit":"","suite":"","office":"","address":"","community":"Whitehorse","latitude":"60.72085","longitude":"-135.05323","mailcode":""},
        {"ObjectId":"1328","organization":"","department":"Community Services","division":"Protective Services","branch":"Wildland Fire Management","unit":"Air Operations","suite":"","office":"91790 Alaska Highway","address":"91790 Alaska Highway","community":"Whitehorse","latitude":"60.7355474","longitude":"-135.097285","mailcode":"C19"},
        {"ObjectId":"4313","organization":"","department":"Highways and Public Works","division":"Transportation","branch":"Transport Services","unit":"Carrier Compliance Section","suite":"","office":"Vehicle Weigh Station","address":"91444 Alaska Highway","community":"Whitehorse","latitude":"60.69168684","longitude":"-135.0637291","mailcode":"W18"},
        {"ObjectId":"576","organization":"","department":"Education","division":"","branch":"","unit":"","suite":"","office":"","address":"","community":"Whitehorse","latitude":"60.72085","longitude":"-135.05323","mailcode":""},
        {"ObjectId":"682","organization":"","department":"Education","division":"Public Schools","branch":"Schools","unit":"Rural Schools","suite":"","office":"Robert Service School","address":"","community":"Dawson City","latitude":"64.06329","longitude":"-139.43434","mailcode":"RSS"},
        {"ObjectId":"2487","organization":"","department":"Energy Mines and Resources","division":"Sustainable Resources","branch":"Agriculture","unit":"","suite":"320A","office":"Elijah Smith Building","address":"300 Main Street","community":"Whitehorse","latitude":"60.71911036","longitude":"-135.0555765","mailcode":"K320A"},
        {"ObjectId":"1178","organization":"","department":"Highways and Public Works","division":"Property Management","branch":"Realty and Capital Asset Planning","unit":"","suite":"","office":"9010 Quartz Road","address":"9010 Quartz Road","community":"Whitehorse","latitude":"60.73198082","longitude":"-135.0670439","mailcode":"W5"},
        {"ObjectId":"1973","organization":"","department":"Education","division":"Advanced Education","branch":"Training Programs","unit":"Student Employment","suite":"","office":"Education Building","address":"1000 Lewes Boulevard","community":"Whitehorse","latitude":"60.71379105","longitude":"-135.0441489","mailcode":"E1"},
        {"ObjectId":"205","organization":"","department":"Health and Social Services","division":"","branch":"","unit":"","suite":"","office":"","address":"H-7","community":"Whitehorse","latitude":"60.72085","longitude":"-135.05323","mailcode":""},
        {"ObjectId":"3199","organization":"","department":"Finance","division":"Financial Operations and Revenue Services","branch":"Financial Operations ","unit":"Accounts Payable","suite":"","office":"Main Administration Building","address":"2071 2nd Avenue","community":"Whitehorse","latitude":"60.71678581","longitude":"-135.0500134","mailcode":"B1"},
        {"ObjectId":"4846","organization":"","department":"Justice","division":"Legal Services","branch":"Litigation","unit":"","suite":"","office":"Yukon Law Centre","address":"2134 2nd Avenue","community":"Whitehorse","latitude":"60.72125651","longitude":"-135.0536272","mailcode":"J2"},
        {"ObjectId":"1186","organization":"","department":"Highways and Public Works","division":"Property Management","branch":"Realty and Capital Asset Planning","unit":"","suite":"","office":"9010 Quartz Road","address":"9010 Quartz Road","community":"Whitehorse","latitude":"60.73198082","longitude":"-135.0670439","mailcode":"W5"},
        {"ObjectId":"2172","organization":"","department":"Community Services","division":"Protective Services","branch":"Emergency Medical Services","unit":"","suite":"","office":"Dawson City Ambulance Station","address":"Km 716 North Klondike Highway","community":"Dawson City","latitude":"64.04201781","longitude":"-139.3925838","mailcode":"EMS-DC"},
        {"ObjectId":"2506","organization":"","department":"Energy Mines and Resources","division":"Oil, Gas and Mineral Resources","branch":"Mineral Resources","unit":"Mineral Planning and Development","suite":"102","office":"Elijah Smith Building","address":"300 Main Street","community":"Whitehorse","latitude":"60.71911036","longitude":"-135.0555765","mailcode":"K102"},
        {"ObjectId":"2413","organization":"","department":"Tourism and Culture","division":"Branch reports direct to TOU DM","branch":"Cultural Services","unit":"Historic Sites","suite":"304","office":"Financial Plaza","address":"204 Lambert Street","community":"Whitehorse","latitude":"60.71795941","longitude":"-135.0519667","mailcode":"L2"},
        {"ObjectId":"751","organization":"","department":"Environment","division":"Environmental Sustainability","branch":"Fish and Wildlife","unit":"Species Programs","suite":"","office":"10 Burns Road","address":"10 Burns Road","community":"Whitehorse","latitude":"60.71595078","longitude":"-135.0833344","mailcode":"V5A"},
        {"ObjectId":"4416","organization":"","department":"Highways and Public Works","division":"Transportation","branch":"Aviation","unit":"Safety and Security","suite":"03-16 Second Floor","office":"Whitehorse Airport Terminal","address":"75 Barkley-Grow Crescent","community":"Whitehorse","latitude":"60.71428804","longitude":"-135.077195","mailcode":"W16"},
        {"ObjectId":"25","organization":"","department":"Executive Council Office","division":"","branch":"","unit":"","suite":"","office":"","address":"2071 2nd Ave","community":"Whitehorse","latitude":"60.71678581","longitude":"-135.0500134","mailcode":""},
        {"ObjectId":"1285","organization":"","department":"Highways and Public Works","division":"Property Management","branch":"Facilities Management and Regional Services","unit":"Eastern Region","suite":"","office":"Building Maintenance Workshop","address":"108 10th Street South","community":"Watson Lake","latitude":"60.06010313","longitude":"-128.7159688","mailcode":"W6WL"},
        {"ObjectId":"1718","organization":"","department":"Health and Social Services","division":"","branch":"","unit":"","suite":"","office":"","address":"","community":"Whitehorse","latitude":"60.72085","longitude":"-135.05323","mailcode":""},
        {"ObjectId":"4450","organization":"","department":"Community Services","division":"Protective Services","branch":"Emergency Medical Services","unit":"","suite":"","office":"Watson Lake Ambulance Station","address":"Km 1003 Alaska Highway","community":"Watson Lake","latitude":"60.05909679","longitude":"-128.6898601","mailcode":"EMS-WL"},
        {"ObjectId":"1619","organization":"","department":"Education","division":"Public Schools","branch":"Schools","unit":"Whitehorse Schools","suite":"","office":"Christ the King Elementary School","address":"20 Nisutlin Drive","community":"Whitehorse","latitude":"60.70537349","longitude":"-135.0356101","mailcode":"CKE"},
        {"ObjectId":"4402","organization":"","department":"Highways and Public Works","division":"Transportation","branch":"Aviation","unit":"Safety and Security","suite":"03-16 Second Floor","office":"Whitehorse Airport Terminal","address":"75 Barkley-Grow Crescent","community":"Whitehorse","latitude":"60.71428804","longitude":"-135.077195","mailcode":"W16"},
        {"ObjectId":"142","organization":"","department":"Health and Social Services","division":"Health Services","branch":"Health System Improvement and Transformation","unit":"Mental Wellness","suite":"Suite 225","office":"","address":"305 Main st.","community":"Whitehorse","latitude":"60.71907864","longitude":"-135.0554376","mailcode":"H23"},
        {"ObjectId":"1111","organization":"","department":"Health and Social Services","division":"","branch":"","unit":"","suite":"","office":"502 Lowe Street","address":"Box 2703, H-16","community":"Whitehorse","latitude":"60.72085","longitude":"-135.05323","mailcode":""},
        {"ObjectId":"140","organization":"","department":"Highways and Public Works","division":"Property Management","branch":"Facilities Management and Regional Services","unit":"Western Region","suite":"","office":"","address":"Box 2703, W-6HJ","community":"Whitehorse","latitude":"60.72085","longitude":"-135.05323","mailcode":""},
        {"ObjectId":"1384","organization":"","department":"Community Services","division":"Protective Services","branch":"Wildland Fire Management","unit":"Finance and Administration","suite":"","office":"91790 Alaska Highway","address":"91790 Alaska Highway","community":"Whitehorse","latitude":"60.7355474","longitude":"-135.097285","mailcode":"C19"},
        {"ObjectId":"1586","organization":"","department":"Health and Social Services","division":"","branch":"","unit":"","suite":"","office":"","address":"","community":"Whitehorse","latitude":"60.72085","longitude":"-135.05323","mailcode":""},
        {"ObjectId":"1069","organization":"","department":"Health and Social Services","division":"Health Services","branch":"Community Nursing","unit":"","suite":"","office":"2 Hospital Road","address":"2 Hospital Road","community":"Whitehorse","latitude":"60.71788244","longitude":"-135.0431709","mailcode":"2Hosp"},
        {"ObjectId":"2042","organization":"","department":"Education","division":"Corporate Services ","branch":"Operations ","unit":"Facilities","suite":"","office":"Education Building","address":"1000 Lewes Boulevard","community":"Whitehorse","latitude":"60.71379105","longitude":"-135.0441489","mailcode":"E1"},
        {"ObjectId":"181","organization":"","department":"Health and Social Services","division":"","branch":"","unit":"","suite":"101","office":"1 Hospital Road","address":"1 Hospital Road","community":"Whitehorse","latitude":"60.71795608","longitude":"-135.0429793","mailcode":"H1H"},
        {"ObjectId":"2408","organization":"","department":"Education","division":"Public Schools","branch":"Schools","unit":"Whitehorse Schools","suite":"","office":"FH Collins Secondary School","address":"1001 Lewes Blvd","community":"Whitehorse","latitude":"60.7030446","longitude":"-135.0251814","mailcode":"FHC"},
        {"ObjectId":"1742","organization":"","department":"Health and Social Services","division":"Continuing Care","branch":"Extended Care Services","unit":"Extended Care","suite":"","office":"Copper Ridge Place","address":"60 Lazulite Drive","community":"Whitehorse","latitude":"60.69986902","longitude":"-135.110811","mailcode":"H18"},
        {"ObjectId":"3705","organization":"","department":"Highways and Public Works","division":"Transportation","branch":"Aviation","unit":"Safety and Security","suite":"","office":"Whitehorse Airport Terminal","address":"","community":"Whitehorse","latitude":"60.72085","longitude":"-135.05323","mailcode":"W16"},
        {"ObjectId":"237","organization":"","department":"Health and Social Services","division":"Corporate Services ","branch":"Information Services Branch","unit":"Information Systems","suite":"201","office":"1 Hospital Road","address":"1 Hospital Road","community":"Whitehorse","latitude":"60.71795608","longitude":"-135.0429793","mailcode":"H1"},
        {"ObjectId":"1535","organization":"","department":"Community Services","division":"Corporate Policy and Consumer Affairs","branch":"Corporate Policy","unit":"","suite":"2nd floor","office":"Berska Building","address":"307 Black St.","community":"Whitehorse","latitude":"60.72360158","longitude":"-135.0590472","mailcode":"C4"},
        {"ObjectId":"4678","organization":"","department":"Justice","division":"Court and Regulatory Services","branch":"Court Services","unit":"Court Operations","suite":"","office":"Yukon Law Centre","address":"2134 2nd Avenue","community":"Whitehorse","latitude":"60.72125651","longitude":"-135.0536272","mailcode":"J3"},
        {"ObjectId":"4","organization":"","department":"Highways and Public Works","division":"Transportation","branch":"Transportation Maintenance","unit":"Western Area","suite":"","office":"","address":"9024 Quartz Road","community":"Whitehorse","latitude":"60.73572103","longitude":"-135.0707895","mailcode":"W24"},
        {"ObjectId":"2847","organization":"","department":"Public Service Commission","division":"Branch reports direct to PSC Commissioner","branch":"Corporate Human Resources and Diversity Services","unit":"","suite":"","office":"Main Administration Building","address":"2071 2nd Avenue","community":"Whitehorse","latitude":"60.71678581","longitude":"-135.0500134","mailcode":"Z2"},
      ],
      hasMap: true,
    }
  },
  computed: {
    mapsPath() {
      return `http://maps.google.com/?q=${this.employee.address} ${this.employee.postal_code}`
    },
    mapsDirections() {
      return `http://maps.google.com/maps/dir//${this.employee.address} ${this.employee.postal_code}`
    }
  },
  mounted() {
    this.renderMap()
  },
  methods: {
    renderMap() {
      var record = this.location_samples.filter(item => {
        if (this.employee.address === item.address) {
          return item;
        }
        if (this.employee.office === item.office) {
          return item;
        }
        if (this.employee.mailcode === item.mailcode) {
          return item;
        }
        if (this.employee.branch === item.branch) {
          return item;
        }
        if (this.employee.division === item.division) {
          return item;
        }
        console.log(this.employee.department)
        if (this.employee.department === item.department) {
          return item;
        }
      });
      this.hasMap = record.length;
      if (record.length) {
        var map = L.map('mapid').setView([record[0].latitude, record[0].longitude], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        L.marker([record[0].latitude, record[0].longitude]).addTo(map);
        this.hasMap = true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>

#mapid { height: 250px; }
.hide-content {
  height: 0;
  min-height: 0;
  overflow: hidden;
  #mapid {
    height: 0;
  }
}
.md-card{
  max-width: 800px;
  width: 100%;
  margin: auto;
  background-color: white;
}
.md-card-header,
.md-card-header+.md-card-content {
  text-align: left;
}


.md-card .md-subhead {
  padding-bottom: 10px;
}

.md-card-media.md-medium {
  margin-right: 20px;
}

.md-button-content {
  display: flex;
  align-items: center;

}

.md-title {
  font-size: 22px;
}

.md-icon {
  margin: 0 5px !important;
}

.card-content {
  text-align: right;
}

.md-card-content {
  padding: 0 !important;
}

.employee-card-content {
  border-top: 1px solid lightgrey;
  text-align: left;
  height: auto;
  max-height: 0;
  transition: max-height .6s ease;
  overflow: hidden;
}

.content-expanded {
  max-height: 400px;
  overflow: scroll;
}


p {
  text-align: left;
  margin-bottom: 0;
}

.mapouter{text-align:right;height:500px;width:600px;}.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}
</style>