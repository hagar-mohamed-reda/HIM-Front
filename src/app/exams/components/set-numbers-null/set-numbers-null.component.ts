import { Component, OnInit } from '@angular/core';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { Request } from 'src/app/shared/request';

@Component({
  selector: 'app-set-numbers-null',
  templateUrl: './set-numbers-null.component.html',
  styleUrls: ['./set-numbers-null.component.scss']
})
export class SetNumbersNullComponent implements OnInit {

  constructor(
    private applicationSettingService: ApplicationSettingService
  ) { }

  setNumbersNull() {
    var _this = this;
    Message.confirm(Helper.trans('are you sure'), () => {
      this.applicationSettingService.setNumbersNull().subscribe((res: any) => {
        if (res == 1) {
          return Message.success(Helper.trans('done'));
        } else {
          return Message.error(Helper.trans('failed'));
        }
      })
    });
  }
  ngOnInit() {
  }

}
