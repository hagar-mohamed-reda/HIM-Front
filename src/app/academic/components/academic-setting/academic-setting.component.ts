import { Component, OnInit } from '@angular/core';
import { HashTable } from 'angular-hashtable';
import { LevelService } from 'src/app/account/services/level.service';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { AcademicSettingService } from '../../services/academic-setting.service';

@Component({
  selector: 'app-academic-setting',
  templateUrl: './academic-setting.component.html',
  styleUrls: ['./academic-setting.component.scss']
})
export class AcademicSettingComponent implements OnInit {

  $: any = $;
  settings = [];
  levels = [];
  settingHash = new HashTable();
  isSubmitted = false;
  password: any = null;
  level_id: any = null;
  action = null;

  constructor(private academicSettingService: AcademicSettingService) {
    this.initSettings();
  }

  ngOnInit() {
    this.loadSettings();
    this.loadLevels();
  }

  loadLevels() {
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
  }

  initSettings() {
    this.settings = [
      {id: 1, value: this.settingHash.get(1)},
      {id: 2, value: this.settingHash.get(2)},
      {id: 3, value: this.settingHash.get(3)},
      {id: 4, value: this.settingHash.get(4)},
      {id: 5, value: this.settingHash.get(5)},
      {id: 6, value: this.settingHash.get(6)},
      {id: 7, value: this.settingHash.get(7)},
      {id: 8, value: this.settingHash.get(8)},
      {id: 9, value: this.settingHash.get(9)},
      {id: 10, value: this.settingHash.get(10)},
      {id: 11, value: this.settingHash.get(11)},
      {id: 12, value: this.settingHash.get(12)},
    ];
  }

  /**
   * load all academic settings
   */
  loadSettings() {
    this.settingHash = new HashTable();
    this.academicSettingService.get().subscribe((res: any) => {
      res.forEach(element => {
        this.settingHash.put(element.id, element.value);
      });
      this.initSettings();
    });
  }

  /**
   * update all settings of academic
   */
  updateSetting() {
    let data = {
      settings: this.settings
    };
    this.isSubmitted = true;
    this.academicSettingService.update(data).subscribe((res: any) => {
      if (res.status == 1)
        Message.success(res.message);
      else
        Message.error(res.message);

      this.isSubmitted = false;
    });
  }

  /**
   * update all settings of academic
   */
  publishResult() {
    if (!this.password || !this.level_id) {
      return Message.error(Helper.trans('fill all data'));
    }

    let data = {
      action: this.action,
      level_id: this.level_id,
      password: this.password
    };
    this.isSubmitted = true;
    this.academicSettingService.updatePublishResult(data).subscribe((res: any) => {
      if (res.status == 1)
        Message.success(res.message);
      else
        Message.error(res.message);

      this.isSubmitted = false;
    });
  }

  /**
   * show modal of publish result
   *
   */
  showPublishResultModal(action) {
    this.action = action;
    this.$('#publishResultModal').modal('show');
  }

}
