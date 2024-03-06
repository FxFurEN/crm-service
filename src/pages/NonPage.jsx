import { Result } from "antd"

function NonPage() {
  return (
    <main id="main">
      <Result
        status="404"
        title={<span style={{ color: "white" }}>404</span>}
        subTitle={<span style={{ color: "white" }}>Страница не найдена.</span>}
      />
    </main>
   
  )
}

export default NonPage
