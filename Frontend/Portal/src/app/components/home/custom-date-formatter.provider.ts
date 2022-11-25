import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {
//   public override monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
//     return formatDate(date, 'EEE', locale!);
//   }

//   public override monthViewTitle({ date, locale }: DateFormatterParams): string {
//     return formatDate(date, 'MMM y', locale!);
//   }

//   public override weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
//     return formatDate(date, 'EEE', locale!);
//   }

  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'HH:mm', locale!);  
  }

  public override dayViewTitle({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'fullDate', locale!);  
  }

  public override dayViewHour({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'HH:mm', locale!);
  }
}