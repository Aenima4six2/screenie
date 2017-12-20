import React from 'react'
import Iframe from 'react-iframe'
import PropTypes from 'prop-types'
import { getServerAddress } from '../utilities'

export default class Screen extends React.Component {
  static propTypes = {
    current: PropTypes.object.isRequired
  }

  state = {}

  componentWillMount() {
    const activePages = this.filterActivePages(this.props.current.pages)
    const initPage = activePages[0]
    this.schedulePages(initPage)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.current !== nextProps.current) {
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
    }, currentPage.durationMs * 1000)

    this.setState({ ...currentPage, schedule })
  }

  filterActivePages = (pages) => pages
    .filter(page => page.isActive)
    .sort((a, b) => a.ordinal - b.ordinal)

  getUrl = () => {
    let url = this.state.url
    if (this.state.forceProxy) {
      const uri = `${getServerAddress()}/proxy?url=${url}`
      return uri
    }

    return url
  }

  render() {
    return (
      <Iframe
        url={this.getUrl()}
        width="100%"
        height="100%"
        id={this.props.current._id}
        display="block"
        position="relative"
        allowFullScreen />
    )
  }
}