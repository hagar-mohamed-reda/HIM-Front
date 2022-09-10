import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { exit } from 'process';
import { Auth } from 'src/app/shared/auth';
import { HashTable } from '../../../../../../node_modules/angular-hashtable';
import { AppModule } from '../../../../app.module';
import { StudentService } from '../../../services/student.service';
import { LevelService } from 'src/app/account/services/level.service';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { Cache } from 'src/app/shared/cache';
@Component({
  selector: 'app-student-index',
  templateUrl: './student-index.component.html',
  styleUrls: ['./student-index.component.scss']
})
export class StudentIndexComponent implements OnInit {

  public doc: any = document;
  public $: any = $;

  // Resources list
  public resources: any = {};

  // init breadcrum
  public breadcrumbList = [];
  public search: any = {};

  // remove options
  public showRemoveButton = false;
  public showRemoveModal = false;
  public trashList = new HashTable<any, any>();
  public removed = [];

  public levels: any = [];

  public applicationSettings = ApplicationSettingService;

  // app


  public pages: any;
  public isLoad = false;

  public selectedItem: any= {};

  public col = "col-lg-12 col-md-12 col-sm-12 col-xs-12";


  constructor(public studentService: StudentService, public router: ActivatedRoute) {
    // init breadcrum
    !Auth.can('student_read')? exit() : '';
    this.breadcrumbList = [
      {name: 'home', url: '/'},
      {name: 'students'}
    ];

    this.router.queryParams.subscribe((params) => {
      let col = params['col'];
      console.log(col);
      //if (col)
      //  this.col = col;
    });

  }


  toggleFromTrash(id) {
    if (this.trashList.has(id)) {
      this.trashList.remove(id);
    }
    else {
      this.trashList.put(id, id);
    }

    if (this.trashList.size() > 0)
      this.showRemoveButton = true;
    else
      this.showRemoveButton = false;
  }

  removeResources() {
    this.showRemoveModal = true;
    const queue = this.trashList.getKeys();
    if (queue.length > 0) {
      const id = queue.pop();
      this.studentService.destroy(id).subscribe(()=> {
        this.removed.push(id);
        this.trashList.remove(id);
        //
        this.removeResources();
      });
    } else {
      this.removed = [];
      this.showRemoveButton = false;
      this.showRemoveModal = false;
      this.loadResources();
    }
  }

  prePagniation() {
    if (!this.resources.data)
      return;
    this.resources.prev_page = this.resources.prev_page_url? this.resources.prev_page_url.replace(this.resources.path+'?page=', '') : null;
    this.resources.next_page = this.resources.next_page_url? this.resources.next_page_url.replace(this.resources.path+'?page=', '') : null;
    this.resources.pages = Math.ceil(this.resources.total / this.resources.per_page);
    this.resources.pages_arr = [];
    for(let i = 0; i < this.resources.pages; i ++)
      this.resources.pages_arr.push(i+1);
  }



  loadResources(page=1) {
    this.isLoad = true;
    this.studentService.get(page, this.search).subscribe( (res: any) => {
      console.log(res);
      
      this.resources = res;
      this.prePagniation();
      this.isLoad = false;
    });
  }

  setStudentContainerHeight() {
    //const height = window.innerHeight - 90;
    //this.doc.jquery('.student-container').css('height', height);
  }
  corona(id: any) {
    if ($(`#customSwitch${id}`).is(':checked')) {
      const formdata = new FormData;
      formdata.append('id' , id)
      formdata.append('isCorona' , '1')
      this.studentService.update(formdata).subscribe((res)=>{});
    } else{
      const formdata = new FormData;
      formdata.append('id' , id)
      formdata.append('isCorona' , '0')
      this.studentService.update(formdata).subscribe((res)=>{});
    }
  }

  ngOnInit() {
    this.setStudentContainerHeight();
    this.loadResources();

    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
  }

  showStudentPayments(item: any) {
    this.selectedItem = item;
    this.doc.jquery('#studentPayments').modal('show');
  }


}
