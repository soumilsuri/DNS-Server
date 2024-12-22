# DNS Resolution Process

![DNS Resolution Process](assets\DNSResolutionProcess.png)

This figure illustrates the step-by-step DNS resolution process, showing how a stub resolver interacts with a recursive DNS resolver and how the recursive resolver queries the DNS hierarchy to resolve a domain name.

1. **Stub Resolver (Client-Side)**:  
   - The stub resolver on the user's device initiates the DNS query when an application (like a web browser) requests the IP address for a domain name (e.g., `example.com`).  
   - It first checks the **local DNS cache** for previously resolved domains. If a cached record exists and is still valid (not expired), it directly returns the result to the application.

2. **Recursive DNS Resolver**:  
   - If the stub resolver doesn't find the result in the local cache, it forwards the query to a **recursive DNS resolver** (configured in the client's network settings).  
   - The recursive resolver also checks its **cache** for a valid record. If no cached result is found, it begins the recursive resolution process.

3. **Root DNS Servers**:  
   - The recursive resolver sends a query to one of the **root DNS servers**, which responds with the address of the appropriate **TLD server** (based on the domain's extension, such as `.com`, `.org`, etc.).

4. **TLD Servers**:  
   - The resolver queries the **TLD nameserver** (e.g., `.com` servers), which provides the address of the **authoritative nameserver** for the specific domain (e.g., `example.com`).

5. **Authoritative Nameservers**:  
   - Finally, the recursive resolver queries the **authoritative nameserver** for the requested domain. This server provides the definitive answer, such as the domain's IP address or other DNS record.

6. **Response to Stub Resolver**:  
   - The recursive resolver caches the response for future queries and returns the result to the stub resolver on the client.  
   - The stub resolver forwards the result to the requesting application, completing the resolution process.

---
## References 
1. https://youtu.be/NiQTs9DbtW4?si=pOXL1bJxrH_nZSrl
2. https://www.cloudflare.com/learning/dns/what-is-dns/