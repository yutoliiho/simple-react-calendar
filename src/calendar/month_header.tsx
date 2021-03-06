import React, { Component, ReactElement } from 'react'
import addMonths from 'date-fns/add_months'
import formatDate from 'date-fns/format'
import isAfter from 'date-fns/is_after'
import isBefore from 'date-fns/is_before'
import startOfMonth from 'date-fns/start_of_month'

import { IDate, IMonthHeaderRenderProps } from '../@types'
import HeaderButton from './header_button'

export type Props = {
  activeMonth: IDate
  blockClassName?: string
  customRender?: IMonthHeaderRenderProps
  headerNextArrow?: ReactElement
  headerNextTitle?: string
  headerPrevArrow?: ReactElement
  headerPrevTitle?: string
  maxDate?: IDate
  minDate?: IDate
  onMonthChange: (...args: any[]) => any
}

// TODO: FC Rewrite
/* eslint-disable react/require-optimization */
export default class MonthHeader extends Component<Props, {}> {
  _switchMonth(offset: -1 | 1) {
    const { onMonthChange, activeMonth } = this.props

    onMonthChange(addMonths(activeMonth, offset))
  }

  render() {
    const {
      activeMonth,
      minDate,
      maxDate,
      blockClassName,
      headerNextArrow,
      headerNextTitle,
      headerPrevArrow,
      headerPrevTitle,
      customRender
    } = this.props

    const prevEnabled = minDate
      ? isBefore(startOfMonth(minDate), startOfMonth(activeMonth))
      : true
    const nextEnabled = maxDate
      ? isAfter(startOfMonth(maxDate), startOfMonth(activeMonth))
      : true

    if (customRender) {
      return customRender({
        ...this.props,
        children:
          'no content, please use activeMonth prop and custom buttons instead',
        nextEnabled,
        prevEnabled,
        switchMonth: this._switchMonth.bind(this)
      })
    }

    return (
      <div className={`${blockClassName}-month_header`}>
        <HeaderButton
          type='prev'
          arrow={headerPrevArrow}
          title={headerPrevTitle}
          enabled={prevEnabled}
          onClick={this._switchMonth.bind(this, -1)}
          blockClassName={blockClassName}
        />
        <div className={`${blockClassName}-month_header_title`}>
          {formatDate(activeMonth, 'MMMM YYYY')}
        </div>
        <HeaderButton
          type='next'
          arrow={headerNextArrow}
          title={headerNextTitle}
          enabled={nextEnabled}
          onClick={this._switchMonth.bind(this, 1)}
          blockClassName={blockClassName}
        />
      </div>
    )
  }
}
