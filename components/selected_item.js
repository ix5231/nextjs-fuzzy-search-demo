const SelectedItem = (props) => (
  <article>
    <section>
      {props.shipment_name}
    </section>
    <section>
      {props.shipment_num}
    </section>
  </article>
)

export default SelectedItem