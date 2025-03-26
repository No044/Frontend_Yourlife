function Header_Y({content = null,name = null}){
  return (
    <div className="page-header">
      <div className="page-block">
        <div className="row align-items-center">

          <div className="col-md-12">
            <div className="page-header-title">
              <h2 className="mb-0">{content} {name}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Header_Y