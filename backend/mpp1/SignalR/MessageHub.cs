using Microsoft.AspNetCore.SignalR;
using mpp1.Model;
using mpp1.Model.DTO;
using mpp1.Service.Interfaces;

namespace mpp1.SignalR;

public class MessageHub : Hub, IMessageHub
{

    private IUserService _userService;

    public MessageHub(IUserService userService)
    {
        _userService = userService;
    }

    public async Task SendMessageToEveryone(MessageDTO message)
    {
        await _userService.AddMessageForUser(message);
        await Clients.Others.SendAsync("SendMessageToEveryone", message);
    }

    public async Task<string> SuggerateMessage(MessageDTO message)
    {
        
    }
}   