using Microsoft.AspNetCore.SignalR;
using mpp1.Model;

namespace mpp1.SignalR;

public class MessageHub : Hub, IMessageHub
{
    public async Task SendMessageToEveryone(Message message)
    {
        await Clients.All.SendAsync("SendMessageToEveryone", message);
    }
}