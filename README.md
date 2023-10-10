# SFU API Wrapper

An asynchronous TypeScript wrapper for the SFU API.

## Usage

```typescript
import sfuapi from 'sfuapi';

// 'await' expressions must be allowed wherever the API wrapper functions are called.
const courseOfferingData = await sfuapi.courseOffering('math', 151, 'd100');
```
