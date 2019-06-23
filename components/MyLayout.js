import Header from './Header'
import '../style/index.css'
import '../style/alert.css'
import '../style/popup.css'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

export default function Layout(props) {
  return (
    <div style={layoutStyle}>
      { props.extraPages==null 
        ? <Header />
        : <Header extraPages={props.extraPages} />
      }
      {props.children}
    </div>
  )
}
