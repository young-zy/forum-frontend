import { Component, OnInit } from '@angular/core';
import { Section } from '../core/entity/section';
import { SectionService } from '../core/services/section/section.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  sectionList: Section[];

  constructor(
    private sectionService: SectionService
  ) { }

  ngOnInit(): void {
    this.sectionService.getSections().subscribe( data => {
        this.sectionList = data.sections;
        console.log(this.sectionList);
      }
    );
  }



}
