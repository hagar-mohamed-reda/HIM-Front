import { Component, OnInit } from '@angular/core';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { Request } from 'src/app/shared/request';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ApplicationSettingService } from '../../../adminision/services/application-setting.service';
import { LevelService } from '../../../account/services/level.service';

@Component({
  selector: 'app-student-affair-report3',
  templateUrl: './student-affair-report3.component.html',
  styleUrls: ['./student-affair-report3.component.scss']
})
export class StudentAffairReport3Component implements OnInit {

  filter: any = {};
  $: any = $;
  applicationService: any = ApplicationSettingService;
  levels: any = [];
  divisions: any = [];
  academicYears: any = [];
  doc: any = document;
  start_number: any;
  level_id: any;


  constructor(
    private globalService: GlobalService,
    private applicationSettingService: ApplicationSettingService) {
      this.applicationSettingService.queueRequests();
      var self = this;
      Request.fire(false, () => {
      });


    }
  calculateCount() {
    this.$('#count').text(this.$('#reportContent tbody tr').length);
  }

  load() {
    // if (!Helper.validator(this.filter, ['level_id', 'division_id', 'academic_year_id' ,'is_application','qualification_id','is_register','created_at','isVaccinated'])) {
    //  return Message.error(Helper.trans('please choose all filters'));
    // }

    this.globalService.loadHtml("affair/report3", this.filter).subscribe((res) => {
      $('#reportContent').html(res);
      this.calculateCount();
    });
  }
  sendNumber(){
    $('#beforeLoading').hide();
    $('#buttonLoading').show();
    var objectSend = {level_id: this.level_id , start_number: this.start_number};
    console.log(objectSend)
    if(this.level_id == undefined || this.start_number == undefined){
      $('#alertNumber').slideDown(300);
      $('#beforeLoading').show();
    $('#buttonLoading').hide();
      setTimeout(() => {
        $('#alertNumber').slideUp(1000);
      }, 1000);
    } else {
      this.applicationSettingService.makeNumber(objectSend).subscribe((res)=>{
        if(res == 1){
          $('#alertNumberSuccess').slideDown(300);
          $('#beforeLoading').show();
    $('#buttonLoading').hide();
      setTimeout(() => {
        $('#alertNumberSuccess').slideUp(1000);
        $('#closeNumber').trigger('click');
        this.level_id = '';
        this.start_number = '';

      }, 1000);
        } else {
          $('#alertNumber').slideDown(300);
          $('#beforeLoading').show();
    $('#buttonLoading').hide();
      setTimeout(() => {
        $('#alertNumber').slideUp(1000);
      }, 1000);
        }
      })
    }
  }

  printContent() {
    this.doc.printJs();
  }

  ngOnInit() {
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
  }
}
