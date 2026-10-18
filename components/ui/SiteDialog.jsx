export default function SiteDialog({dialogRef,modal}) {
  return <dialog className="site-dialog" ref={dialogRef} onClick={event=>{if(event.target===dialogRef.current)dialogRef.current.close();}}>
    <button className="site-dialog__close" type="button" onClick={()=>dialogRef.current?.close()} aria-label="Закрыть">×</button>
    <p className="site-dialog__eyebrow">MARINA CARPER</p>
    <h3>{modal.title}</h3><p>{modal.text}</p>
    <button type="button" className="site-dialog__action" onClick={()=>dialogRef.current?.close()}>Понятно</button>
  </dialog>;
}
