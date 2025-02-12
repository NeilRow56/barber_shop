const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const HomePage = async () => {
  await delay(5000)
  return (
    <div>
      <h1>Home page</h1>
    </div>
  )
}

export default HomePage
