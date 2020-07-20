Input

```jsx inside Markdown
const [value, setVal] = React.useState('')
const changeHandler = e => setVal(e.target.value)
;<Input
	val={value}
	handleChange={e => changeHandler(e)}
	placeholder="Placeholder"
	label="Input Label"
/>
```
