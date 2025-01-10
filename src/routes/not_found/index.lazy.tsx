import { createLazyFileRoute } from '@tanstack/react-router'

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
        Go Back Home
      </a>
    </div>
  )
}

export const Route = createLazyFileRoute('/not_found/')({
  component: NotFound,
})
