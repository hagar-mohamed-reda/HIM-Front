import { Component, OnInit } from '@angular/core';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { Request } from 'src/app/shared/request';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ApplicationSettingService } from '../../../adminision/services/application-setting.service';
import { LevelService } from '../../../account/services/level.service';
import { CourseService } from '../../../academic/services/course.service';
import { DivisionService } from 'src/app/account/services/division.service';
import { SystemSettingService } from 'src/app/core/services/system-setting.service';

@Component({
  selector: 'app-print-signs-reports',
  templateUrl: './print-signs-reports.component.html',
  styleUrls: ['./print-signs-reports.component.scss']
})
export class PrintSignsReportsComponent implements OnInit {
  filter: any = {};
  $: any = $;
  applicationService: any = ApplicationSettingService;
  divisions: any = [];
  academicYears: any = [];
  doc: any = document;
  courses: any = [];
  division_id: any;
  currentTerm: any = {};
  levels: any = [];
  level_id: any;

  constructor(
    private courseService: CourseService,
    private globalService: GlobalService,
    private applicationSettingService: ApplicationSettingService, private systemSetting: SystemSettingService) {
      this.applicationSettingService.queueRequests();
      var self = this;
      Request.fire(false, () => {
      });
      this.courseService.get().subscribe((res) => {
        this.courses = res;
      });


    }

    exportExcel() {
      this.doc.exportExcel('student_exams', "table");
    }

  load() {
    if (!Helper.validator(this.filter, ['course_id','division_id'])) {
      return Message.error(Helper.trans('please choose all filters'));
    }

    this.globalService.loadHtml("affair/report7", this.filter).subscribe((res) => {
      $('#reportContent').html(res);
    });
  }

  printContent() {
    this.doc.printJs();
  }
  division(val: any){
    this.division_id = val;
  }

  ngOnInit() {
    this.divisions = Cache.get(DivisionService.DIVISION_PREFIX);

    // set select2
    setTimeout(() => {
      this.$('.select2').select2();
    }, 500);
    this.systemSetting.getSystemSetting().subscribe((res: any)=>{
      this.currentTerm = res['current_term'];
    });
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
  }

}
