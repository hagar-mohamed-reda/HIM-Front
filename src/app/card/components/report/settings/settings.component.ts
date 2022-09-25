import { Component, OnInit } from '@angular/core';
import { HashTable } from 'angular-hashtable';
import { AcademicSettingService } from 'src/app/academic/services/academic-setting.service';
import { LevelService } from 'src/app/account/services/level.service';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  $: any = $;
  settings = [];
  levels = [];
  settingHash = new HashTable();
  rPaymentSettings = new HashTable();
  unrPaymentSettings = new HashTable();
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
      {id: 13, value: this.settingHash.get(13)},

    ];


    // /card/card_exports_settings   (get)
    // /card/card_exports_settings   (post) 
    
    console.log(this.settings);
    
  }
  loadSettings() {
    this.settingHash = new HashTable();
    this.academicSettingService.get().subscribe((res: any) => {
      res.forEach(element => {
        this.settingHash.put(element.id, element.value);
      });
      this.getPaymentSettings();

    });
  }
  updateSetting() {

    const academicWithoutPaymentSettingsLength = 13
    let data = {
      settings: this.settings.slice(0 , academicWithoutPaymentSettingsLength)
    };
    const paymentData = this.settings.slice(academicWithoutPaymentSettingsLength , this.settings.length)
    
    const paymentSettings = []

    paymentData.forEach(element => {
      element.id = element.id - data.settings.length
      paymentSettings.push(element)
    });


    this.isSubmitted = true;
    this.academicSettingService.update(data).subscribe((res: any) => {
      if (res.status == 1)
        Message.success(res.message);
      else
        Message.error(res.message);

      this.isSubmitted = false;
    });

    this.academicSettingService.updatePaymentSettings(paymentSettings).subscribe(res => {
       alert("done") 
    })
  }

  getPaymentSettings(){
    this.academicSettingService.getAcademicPaymentSettings().subscribe((res : any) => {
      const r = res.restricted;
      const unr = res.unrestricted;
      r.forEach(i => {
        this.rPaymentSettings.put(i.id , i.value)
      })
      unr.forEach(i => {
        this.unrPaymentSettings.put(i.id , i.value)
      })

      this.initSettings();

    })
  }

}
