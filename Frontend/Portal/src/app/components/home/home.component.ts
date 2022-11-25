import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  addMinutes,
} from 'date-fns';
import { map, Subject, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { Agendamento } from 'src/app/models/agendamento';
import { AlertService } from '../alert/alert.service';
import { CustomDateFormatter } from './custom-date-formatter.provider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent?: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData?: {
    action: string;
    event: CalendarEvent;
  };

  refresh = new Subject<void>();
  events: CalendarEvent[] = [];

  agendamentos!: Agendamento[];
  activeDayIsOpen: boolean = false;

  constructor(
    private modal: NgbModal,
    protected alertService: AlertService,
    protected agendamentoService: AgendamentoService) 
    {}
  
  ngOnInit(): void {
    this.getAgendamentos();
  }

  mapAgendamentoToEvent(agd: Agendamento): CalendarEvent {
    return {
      id: agd.id,
      start: new Date(agd.dataInicio),
      end: new Date(agd.dataFim),
      title: `${agd.cliente?.nome} - ${agd.procedimento?.nome}`
    } as CalendarEvent
  }

  getAgendamentos() {
    this.agendamentoService.getList()
    .pipe(
      map(res => res.map(x => this.mapAgendamentoToEvent(x)))
    )
    .subscribe({
      next: (result) => {
        this.events = result;
        this.refresh.next();
      },
      error: (error) => this.alertService.error(error.message, { timeout: 5 }),
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        //this.activeDayIsOpen = false;
      } else {
        //this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
