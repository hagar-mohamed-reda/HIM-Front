import { AfterContentChecked, AfterViewChecked, Component, ContentChild, DoCheck, OnChanges, OnInit } from '@angular/core';
import { TermService } from 'src/app/account/services/term.service';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { CourseCategoryService } from '../../services/course-category.service';
import { CourseService } from '../../services/course.service';
import { DegreeMapService } from '../../services/degree-map.service';
declare var XLSX: any;
@Component({
  selector: 'app-academic-plan',
  templateUrl: './academic-plan.component.html',
  styleUrls: ['./academic-plan.component.scss']
})
export class AcademicPlanComponent implements OnInit  {

  public $: any = $;
  public category: any = {};
  public course: any = {};
  public courseCategory: any = {};
  public degreeMap: any = {};

  categories: any = [];
  degreeMaps: any = [];
  updateView: any;
  search: any = {};
  terms: any = [];

  requestQueue = [];

  constructor(
    private termService:TermService,
    private courseService: CourseService,
    private courseCategoryService: CourseCategoryService,
    private degreeMapService: DegreeMapService
  ) {
    this.updateView = () => { this.loadAll(); console.log('update view'); };
  }
  ExportToExcel(type, fn, dl) {
    var elt = document.getElementById('tbl_exporttable_to_xls');
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
    return dl ?
      XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
      XLSX.writeFile(wb, fn || ('MySheetName.' + (type || 'xlsx')));
 }
  ngOnInit() {
    this.terms = Cache.get(TermService.TERPM_PREFIX);

    setTimeout(() => {
      this.$('.select2').select2();
    }, 1500);
    this.loadAll();
  }

  loadCategories() {
    this.courseCategoryService.get().subscribe((res) => {
      this.categories = res;
    });
  }

  loadAll() {
    this.loadCategories();
    this.degreeMapService.get().subscribe((res) => {
      this.degreeMaps = res;
    });
  }


  /**
   * show course modal
   *
   */
  showCourseForm(course=null) {
    if (course) {
      this.course = course;
    } else {
      this.course = {};
    }
    this.$('#courseFormModal').modal('show');
  }

  /**
   * show course category modal
   *
   */
  showCourseCategoryForm(courseCategory=null) {
    if (courseCategory) {
      this.courseCategory = courseCategory;
    } else {
      this.courseCategory = {};
    }
    this.$('#courseCategoryFormModal').modal('show');
  }

  /**
   * show course modal
   *
   */
  showDegreeMapForm(degreeMap=null) {
    if (degreeMap) {
      this.degreeMap = degreeMap;
    } else {
      this.degreeMap = {};
    }
    this.$('#degreeMapFormModal').modal('show');
  }

  /**
   * remove row
   */
  remove(key, object, index) {
    let self = this;
    Message.confirm(Helper.trans('are you sure'), function(){
      if (key == 'COURSE_CATEGORY') {
        self.courseCategoryService.destroy(object.id).subscribe((res: any) => {
          if (res.status == 1) {
            Message.success(res.message);
            self.categories.splice(index, index+1);
          } else
            Message.error(res.message);

        });
      } else if (key == 'DEGREE_MAP') {
        self.degreeMapService.destroy(object.id).subscribe((res: any) => {
          if (res.status == 1) {
            Message.success(res.message);
            self.degreeMaps.splice(index, index+1);
          } else
            Message.error(res.message);

        });
      } else if (key == 'COURSE') {
        self.courseService.destroy(object.id).subscribe((res: any) => {
          if (res.status == 1) {
            Message.success(res.message);
            self.loadCategories();
          } else
            Message.error(res.message);

        });
      }


    });
  }

  /**
   * filter the coureses
   */
  filter() {
    let cats = this.$('.filter-category').val();

    if (cats.length <= 0)
      return this.$('.category-row').show();

    this.$('.category-row').hide();
    cats.forEach(element => {
        this.$('.category-'+ element).show();
    });
  }
}
