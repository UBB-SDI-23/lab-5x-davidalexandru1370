using Microsoft.AspNetCore.SignalR;
using mpp1.Model;
using mpp1.Model.DTO;
using mpp1.Service.Interfaces;

namespace mpp1.SignalR;

public class MessageHub : Hub, IMessageHub
{
    private IUserService _userService;
    private static HttpClient _httpClient = new HttpClient();

    public MessageHub(IUserService userService)
    {
        _userService = userService;
    }

    public async Task SendMessageToEveryone(MessageDTO message)
    {
        await _userService.AddMessageForUser(message);
        await Clients.Others.SendAsync("SendMessageToEveryone", message);
    }

    public async Task<IEnumerable<String>?> SuggestsMessage(MessageDTO message)
    {
        var response = await _httpClient.GetAsync($"http://localhost:5001/predict-next-word?sentence={message.Text}");
        var suggestedMessages = await response.Content.ReadFromJsonAsync<IEnumerable<String>>();
        return suggestedMessages;
    }
}