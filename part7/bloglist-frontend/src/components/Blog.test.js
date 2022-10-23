import React from 'react'
import Blog from './Blog'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  let container
  const del_mock = jest.fn()
  const like_mock = jest.fn()
  let blog

  beforeEach( () => {
    blog = {
      title: 'test_title',
      author: 'test_author',
      url: 'test_url',
      likes: 1,
    }
    container = render(<Blog blog={blog} handleDeleteClick={del_mock} handleLikeClick={like_mock} />).container
  })

  test('only title and author by default', () => {
    const collapsed = container.querySelector('#collapsed')
    expect(collapsed).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(collapsed).not.toHaveTextContent(`${blog.author} ${blog.url} ${blog.likes}`)
  })

  test('full blog viewed after clicking', async () => {
    const user = userEvent.setup()
    const expand_blog_btn = screen.getByText('view')
    await user.click(expand_blog_btn)
    const expanded = container.querySelector('#expanded')
    Object.keys(blog).forEach( key => {
      expect(expanded).toHaveTextContent(`${blog[key]}`)
    })
  })

  test('like event twice', async () => {
    const user = userEvent.setup()
    const expand_blog_btn = screen.getByText('view')
    await user.click(expand_blog_btn)
    const like_btn = screen.getByText('like')
    await user.click(like_btn)
    await user.click(like_btn)
    expect(like_mock.mock.calls).toHaveLength(2)
  })

})