import React from 'react'
import Iframe from 'react-iframe'
import PropTypes from 'prop-types'

export default class Screen extends React.Component {
  state = {}

  componentWillMount() {
    const activePages = this.filterActivePages(this.props.current.pages)
    const initPage = activePages[0]
    this.schedulePages(initPage)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.current !== nextProps.current) {
      if (this.state.schedule) {
        clearInterval(this.state.schedule)
      }

      const activePages = this.filterActivePages(nextProps.current.pages)
      const newPage = activePages[0]
      this.schedulePages(newPage)
    }
  }

  componentWillUnmount() {
    if (this.state.schedule) {
      clearInterval(this.state.schedule)
    }
  }

  schedulePages = (currentPage) => {
    const schedule = setTimeout(() => {
      const activePages = this.filterActivePages(this.props.current.pages)
      const pageCount = activePages.length
      const lastPageIndex = pageCount - 1
      const currentPageIndex = activePages.indexOf(currentPage)
      const nextPageIndex = currentPageIndex < lastPageIndex ? currentPageIndex + 1 : 0
      const nextPage = activePages[nextPageIndex]
      this.schedulePages(nextPage)
    }, currentPage.interval * 1000)

    this.setState({ ...currentPage, schedule })
  }

  filterActivePages = (pages) => pages.filter(page => page.isActive)

  render() {
    return (
      <Iframe
        url={this.state.url}
        width="100%"
        height="100%"
        id={this.props.current._id}
        display="block"
        position="relative"
        allowFullScreen />
    )
  }
}

Screen.props = {
  current: PropTypes.object.isRequired
}